// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// POST endpoint to handle the tracking data
app.post('/track', (req, res) => {
  const trackingData = req.body;
  console.log('Received Tracking Data:', trackingData);

  // Here, you can process or store the data as needed
  // For example, logging it to the console (or saving to a database)

  // Respond to confirm receipt
  res.status(200).send({ message: 'Data received successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
