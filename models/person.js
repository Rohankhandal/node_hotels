const mongoose = require("mongoose");

// Define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (v) {
    //     return /^\d{10}$/.test(v); // Validates that the number has exactly 10 digits
    //   },
    //   message: "Mobile number must be 10 digits.",
    // },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String, // Changed to String to accommodate alphanumeric addresses
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// Create Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
