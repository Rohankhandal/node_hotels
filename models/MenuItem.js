//Data
// {
//     "name:":"Spicy Chicken Wings",
//     "price":9.99,
//     "taste":"Spicy",
//     "is_drink":false,
//     "ingredients":["chicken wings","spices","sauce"]
//     "num_sales":61
// }

const mongoose = require("mongoose");

// Define the menu item schema
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  price: {
    type: Number,
    required: true, // Price is required
    min: 0, // Price should be non-negative
  },
  taste: {
    type: String,
    enum: ["Sweet", "Spicy", "Sour"],
    required: true, // Taste is required
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String], // Array of strings for ingredients
    default: [],
    required: true, // Ingredients are required
  },
  num_sales: {
    type: Number,
    required: true, // Number of sales is required
    min: 0, // Should not be negative
    default: 0,
  },
});

// Create the MenuItem model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
