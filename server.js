const express = require("express");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");

dotenv.config();

const app = express();

// Create db connection
const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to database
db.connect((error) => {
  if (error) {
    console.error("Failed to connect to database!");
  }
  console.log("Connected to MySQL database successfully!");
});

// API Home
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Database Module Week 5 Assignment!");
});

// Retrive all paitents
app.get("/patients", (req, res) => {
  const getAllPatients =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
  db.query(getAllPatients, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Error retrieving patients information!",
        error: err.errno,
      });
    }
    res.status(200).json(data);
  });
});

// Retrive all provider
app.get("/providers", (req, res) => {
  const getAllProviders =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(getAllProviders, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Error retrieving providers information!",
        error: err.errno,
      });
    }
    res.status(200).json(data);
  });
});

// Retrive all paitents by first name
app.get("/patients/:firstname", (req, res) => {
  const { firstname } = req.params;
  const getPatientByFirstName = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = '${firstname}'`;
  db.query(getPatientByFirstName, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Error retrieving patients information!",
        error: err.errno,
      });
    }
    res.status(200).json(data);
  });
});

// Retrive all paitents by their specialty
app.get("/providers/:specialty", (req, res) => {
  const { specialty } = req.params;
  const getProvidersBySpecialty = `SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = '${specialty}'`;
  db.query(getProvidersBySpecialty, (err, data) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Error retrieving providers information!",
        error: err.errno,
      });
    }
    res.status(200).json(data);
  });
});

// Listening to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}`);
});
