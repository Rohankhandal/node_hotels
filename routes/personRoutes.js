const express = require("express");
const router = express.Router();
// Import Person schema
const Person = require(".././models/person");

//Define Routes for /person

// POST route to add a Person
router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log request data to confirm fields
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose Model
    const newPerson = new Person(data);

    //save the new person to the database using await
    const savedPerson = await newPerson.save();

    console.log("Saved Person to database");
    res.status(201).json(savedPerson);
  } catch (error) {
    console.log("Error saving person:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the all person details

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Sever Error" });
  }
});

//Parametrized Endpoints
// Parametrized Endpoint to get people by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from URL parameter

    // Check if workType is a valid option in the work schema enum
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
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

// PUT route to update a Person by ID
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person ID from URL parameters
    const updatedPersonData = req.body; // Get the updated data from the request body

    // Find the person by ID and update with new data
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document after modification
        runValidators: true, // Run mongoose schema validations on the update
      }
    );

    if (!response) {
      // Check if person was not found
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated successfully"); // Log success message to console
    res.status(200).json(response); // Send the updated document as a response
  } catch (err) {
    console.log("Error updating person:", err); // Log error to console
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

// DELETE route to remove a Person by ID
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person ID from URL parameters

    // Find the person by ID and delete from the database
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      // If no person is found with that ID, return a 404 error
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Person deleted successfully"); // Log success message to console
    res.status(200).json({ message: "Person deleted successfully" }); // Send success response
  } catch (err) {
    console.log("Error deleting person:", err); // Log error to console
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

module.exports = router; // Make sure to export the router
