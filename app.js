const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');  // Database connection
const parkingRoutes = require('./routes/parkingRoutes');  // Parking routes
const reservationRoutes = require('./routes/reservationRoutes');  // Reservation routes
const authRoutes = require('./routes/authRoutes');  // Auth routes
const notifRoutes = require('./routes/notifRoutes');  // notif routes
const path = require('path');

dotenv.config();  // Load environment variables from .env

const app = express();

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests
// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public'))); 

// Connect to MySQL
sequelize
  .authenticate()  // Test the database connection
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Sync models with the database
sequelize.sync();

// Set up routes
app.use('/parkings', parkingRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);
app.use('/notif', notifRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


