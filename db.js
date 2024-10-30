const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL; // Replace 'hostel' with your database name
const mongoURL = process.env.MONGODB_URL;
// Set up MongoDB Connection
mongoose.connect(mongoURL);
// Get the default connection
const db = mongoose.connection;

// Define event list eners for database connection
db.on("connected", () => {
  console.log("Connected to Mongo Server");
});
db.on("error", (error) => {
  console.log("Mongo connection error:", error);
});
db.on("disconnected", () => {
  console.log("Mongo disconnected.");
});

// Export the Database Connection
module.exports = db;
