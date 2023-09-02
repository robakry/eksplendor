if (process.env.NODE_ENV !== "procuction") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AsyncError = require("./utils/asyncError");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const eksplendorRoutes = require("./routes/eksplendor");
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const UserDB = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const EksplendorDB = require("./models/eksplendor");
const ReviewDB = require("./models/review");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.db_url;

// Connecting to Mongo Database
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Eksplendor database connected");
});

// Express Settings
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());
app.use(flash());
app.use(mongoSanitize());

// Session and Cookies Config
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "thisshouldbeabettersecret!",
  },
});

store.on("error", function (e) {
  console.log("Session Error:", e);
});

const sessionConfig = {
  store,
  name: "ss",
  secret: "sekretnykod",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserDB.authenticate()));
passport.serializeUser(UserDB.serializeUser());
passport.deserializeUser(UserDB.deserializeUser());

// Express Locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Express Routes
app.use("/places", eksplendorRoutes);
app.use("/user", userRoutes);
app.use("/places/:id/review", reviewRoutes);

//Eksplendor Home Page
app.get("/", async (req, res) => {
  const placeDB = await EksplendorDB.find({});
  const userDB = await UserDB.find({});
  const reviewsDB = await ReviewDB.find({});
  res.render("eksplendor/index", { placeDB, userDB, reviewsDB });
});

// Eksplendor Error Handler
app.all("*", (req, res, next) => {
  next(new AsyncError("Strona nie znaleziona", 404));
});
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Coś poszło nie tak :(";
  res.status(status).render("error", { err });
});

// Eksplendor site status
app.listen(port, () => {
  console.log(`Eksplendor started, listening to the port:${port}`);
});
