const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hostel"; // Replace 'hostel' with your database name

// Set up MongoDB Connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
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
