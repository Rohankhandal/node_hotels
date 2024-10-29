const express = require("express");
const router = express.Router();
//Import MenuItem Schema
const MenuItem = require(".././models/MenuItem");

// Question:-Create a POST method API to store data or menu items as per the schema we discussed ( /menu )

// POST method to add a new menu item to the database
// {
//   "name": "Spicy Chicken Wings",
//   "price": 9.99,
//   "taste": "Spicy",
//   "is_drink": false,
//   "ingredients": ["chicken wings", "spices", "sauce"],
//   "num_sales": 61
// }

router.post("/", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body for debugging
    const data = req.body;

    // Create a new instance of the MenuItem model using request data
    const newMenu = new MenuItem(data);

    // Save the new menu item to the database
    const savedMenu = await newMenu.save();

    console.log("Saved menu to database"); // Log successful save
    res.status(201).json(savedMenu); // Return the saved menu item with a 201 status
  } catch (error) {
    console.error("Error saving Menu:", error); // Log error details
    res.status(500).json({ error: "Internal Server Error" }); // Send 500 error response
  }
});

// Question:-Create a GET method API to List down the All Menu Items as per the schema we discussed ( /menu )
//GET method to get the all Menu  details
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
