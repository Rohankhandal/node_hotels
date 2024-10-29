// Import Express and Body-Parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const db = require("./db");

// Use bodyParser to parse JSON in request bodies
app.use(bodyParser.json());

// Import Person schema
const Person = require("./models/person");

//Import MenuItem Schema
const MenuItem = require("./models/MenuItem");

const personRoutes = require("./routes/personRoutes");

const menuItemRoutes = require("./routes/menuItemRoutes");

// Basic Route (GET)
app.get("/", (req, res) => {
  res.send(
    "Welcome to my hostel... How can I help you? We have a list of menus."
  );
});

app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

// Start the server
//commit added for testing purpose
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
