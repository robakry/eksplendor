
# Eksplendor - Virtual map of places

Live App: https://eksplendor.onrender.com/

## 📷 Screenshots

![](https://res.cloudinary.com/dwvei3ags/image/upload/v1694990841/Zrzut_ekranu_2023-09-18_004445_vvuhyx.png)

![](https://res.cloudinary.com/dwvei3ags/image/upload/v1694990843/Zrzut_ekranu_2023-09-18_004554_wih9vk.png)

![](https://res.cloudinary.com/dwvei3ags/image/upload/v1694990843/Zrzut_ekranu_2023-09-18_004645_ce0mcl.png)



## Technologies Used

- [Express.js](https://github.com/expressjs/express)
- [Express-Session](https://github.com/expressjs/session)
- [Passport.js](https://github.com/jaredhanson/passport)
- [MongoDB](https://github.com/mongodb/mongo)
- [Mongoose](https://github.com/Automattic/mongoose)
- [Cloudinary](https://github.com/cloudinary/cloudinary_npm)
- [Mapbox](https://github.com/mapbox/mapbox-gl-js)
- [EJS (Embedded JavaScript Templates)](https://github.com/mde/ejs)
- Mongo DB Atlas to host database 
- Render to host the complete application

## To run this project on your system:
Create an .env file and add values to the following variables:
```
cloud_name=<Your Cloudinary cloud name>
api_key=<Your Cloudinary key>
api_secret=<Your Cloudinary secret>
mapboxtoken=<Your Mapbox token>
db_url=<Your MongoDB atlas URL or local MongoDB URL>
```
If you don't have MongoDB atlas make sure you have [MongoDB](https://docs.mongodb.com/manual/installation/) installed on your system
In a terminal window, initialize a MongoDB Database:
```
$ ./mongod
```
In a second terminal window, access the MongoDB Database with Mongoose:
```
$ mongoose
```
In a third terminal window, install dependencies using npm:

```
$ npm install
```
And then run the application with:
```
$ node app.js
```
