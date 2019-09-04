const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productCategoryRoutes = require('./api/routes/productCategory');
const productRoutes = require("./api/routes/products");
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const purchaseRoutes = require('./api/routes/purchases');
const cartsRouters = require('./api/routes/carts');

// mongo db connection
mongoose.connect(
    "mongodb+srv://demo1:" +
      process.env.MONGO_ATLAS_PW +
      "@todo-awleb.mongodb.net/onlineShop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  );
  
  // invoking mongoose promise
  mongoose.Promise = global.Promise;

  //using morgan to log all activities
app.use(morgan("dev"));
// initializing a static files and folders
app.use('/uploads', express.static('uploads'));
//using bodyParser to get form body data from the http request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross-Origin Resource Sharing (CORS) - HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/productsCategory", productCategoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/carts', cartsRouters);

//Return back error (404) to user if route is not found
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//Returning the exact error from the users request.
//user espected to see 404 if not foun or 500 if server error occured.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


  module.exports = app;