const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;  // The port your backend server will listen on

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) to allow frontend to communicate with backend
app.use(bodyParser.json()); // Parse JSON bodies for incoming requests

// POST endpoint to handle the tracking data
app.post('/track', (req, res) => {
  // The body of the incoming request contains the tracking data
  const trackingData = req.body;

  // Log the received tracking data to the console
  console.log('Received Tracking Data:', trackingData);

  // You can process or store the data here as needed (e.g., save to a database)

  // Respond with a success message to the frontend
  res.status(200).send({ message: 'Data received successfully' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
