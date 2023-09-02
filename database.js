const mongoose = require('mongoose');
const Place = require('./models/eksplendor')

mongoose.set( "strictQuery", false );
mongoose.connect('mongodb://127.0.0.1:27017/EksplendorDB')
.then(() => {console.log("Mongoose Database Connected")})
.catch(err => {console.log(`Failed to Connect to Mongoose ${err}`)});
