const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an instance of express to serve endpoints
const app = express();

// Enable CORS
app.use(cors());

// For serve JSON files
const fs = require("fs");

// Configure express instance with some body-parser settings
// Including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This is where who handle routes
const routes = require("./routes/routes.js")(app, fs);

// Finally, launch the server on port 3001.
const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
