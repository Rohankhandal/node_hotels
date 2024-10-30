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

// Question 1: Create a parameterized GET Method API for the Menu Item on the Basis of
// taste Type via using Express Router
// ( /menu/:taste )

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // Extract the work type from URL parameter

    // Check if tasteType is a valid option in the work schema enum
    // ["Sweet", "Spicy", "Sour"]
    if (tasteType == "Sweet" || tasteType == "Spicy" || tasteType == "Sour") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Response Fetched"); // Log success

      // Send fetched data
      res.status(200).json(response);
    } else {
      // Handle invalid work type
      res.status(404).json({ error: "Invalid work type provided" });
    }
  } catch (err) {
    console.error(err); // Log any server errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Question 2: Create a PUT Method API to update the MenuItem Records ( menu/:id )

// PUT route to update a menu by ID
router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the person ID from URL parameters
    const updatedMenuData = req.body; // Get the updated data from the request body

    // Find the person by ID and update with new data
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true, // Return the updated document after modification
      runValidators: true, // Run mongoose schema validations on the update
    });

    if (!response) {
      // Check if person was not found
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("Data updated successfully"); // Log success message to console
    res.status(200).json(response); // Send the updated document as a response
  } catch (err) {
    console.log("Error updating person:", err); // Log error to console
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

// DELETE route to remove a Menu by ID
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the person ID from URL parameters

    // Find the person by ID and delete from the database
    const response = await MenuItem.findByIdAndDelete(menuId);

    if (!response) {
      // If no person is found with that ID, return a 404 error
      return res.status(404).json({ error: "Menu not found" });
    }

    console.log("Menu deleted successfully"); // Log success message to console
    res.status(200).json({ message: "Menu deleted successfully" }); // Send success response
  } catch (err) {
    console.log("Error deleting person:", err); // Log error to console
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});
module.exports = router;
