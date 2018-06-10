// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Instantiate our Express App
var app = express();

// Set up an Express Router
var router = express.Router();
var db = require("/models");

// Require our routes file to pass our router object
require("./config/routes")(router);

//Designate our public folder as a static directory
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

// Have every request go through our router middleware
app.use(router);

// If deployed, use the deployed database.  Otherwise use the local mongoHeadlines databse
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Connect mongoose to our database
mongoose.connect(db, function(error) {
    // Log an errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    // Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});

// Listen on the port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});