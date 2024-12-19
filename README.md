# FakeWebDataCollector

## Overview
FakeWebDataCollector is a project designed to demonstrate data tracking by collecting various user interactions and metrics from a frontend application and sending them to a backend server. This includes geolocation, mouse movements, keyboard activity, and other browser and network information.

## Features
- Tracks user interactions such as mouse movements, keyboard activity, and time spent on the page.
- Collects geolocation, network connection details, and browser metrics.
- Sends the collected data to a backend server.
- Backend processes and logs the data (can be extended to store it in a database).

## Technologies Used
### Frontend:
- **React**: For building the user interface.
- **Axios**: For sending HTTP requests to the backend.

### Backend:
- **Node.js**: For creating the server.
- **Express**: For handling API routes.
- **CORS**: For enabling communication between frontend and backend.

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/vanosski/FakeWebDataCollector.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd FakeWebDataCollector/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:5000` (or a different port if `PORT` is set in the environment).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd FakeWebDataCollector/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```
   The frontend will start on `http://localhost:3000`.

## Deployment

### Backend
1. Deploy the backend on [Render](https://render.com):
   - Use the `backend/` directory as the root directory.
   - Set the build command to `npm install`.
   - Set the start command to `node server.js`.
   - Ensure CORS is configured to allow requests from the frontend domain.

### Frontend
1. Deploy the frontend on [Vercel](https://vercel.com):
   - Ensure the `frontend/` directory is the root directory.
   - Update the backend API URL in the frontend code to point to the Render backend.

## Usage
1. Open the deployed frontend application.
2. Click the **Predict** button to send user interaction data to the backend.
3. View the data logged in the backend server console (or wherever the backend processes/store it).

## Endpoints
### Backend API
#### POST `/track`
- **Description**: Receives user tracking data from the frontend.
- **Request Body**:
  ```json
  {
    "browser": "string",
    "device": "string",
    "language": "string",
    "cookiesEnabled": true,
    "onlineStatus": true,
    "screenResolution": "string",
    "colorDepth": "number",
    "pixelRatio": "number",
    "viewportWidth": "number",
    "viewportHeight": "number",
    "timezoneOffset": "number",
    "localTime": "string",
    "connectionType": "string",
    "connectionDownlink": "string",
    "connectionRTT": "string",
    "mousePosition": { "x": "number", "y": "number" },
    "keyboardActivity": ["string"],
    "performanceMetrics": {
      "fcp": "number",
      "lcp": "number",
      "cls": "number"
    },
    "timestamp": "string",
    "ip": "string",
    "location": "string",
    "latitude": "number",
    "longitude": "number",
    "timeSpent": "number"
  }
- **Response**:
  ```json
  {
    "message": "Data received successfully"
  }



