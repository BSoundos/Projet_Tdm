const User = require('../models/User');
const Parking = require('../models/Parking');
const Reservation = require('../models/Reservation');
var admin = require("firebase-admin");
const { Sequelize } = require('sequelize');

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

async function sendNotificationToTokens(tokens, messageTitle, messageBody) {
    const message = {
        notification: {
            title: messageTitle,
            body: messageBody,
        },
        tokens: tokens,
    };
  
    try {
      const response = await admin.messaging().sendMulticast(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async function getRegistrationTokens() {
    try {
      const users = await User.findAll({
        attributes: ['token'],
        where: {
          token: {
            [Sequelize.Op.ne]: null,  // Récupère seulement les tokens non nuls
          },
        },
      });
  
      const registrationTokens = users.map(user => user.token);
      return registrationTokens;
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      throw error;
    }
  }
  
  
// Exemple d'utilisation avec les tokens récupérés
// getRegistrationTokens().then(tokens => {
//     if (tokens.length > 0) {
//       sendNotificationToTokens(tokens, 'Hello World', 'This is a notification message.');
//     } else {
//       console.log('No tokens found.');
//     }
//   }).catch(error => {
//     console.error('Error:', error);
//   });

  const sendNotifications = async (req, res) => {
    try {
      const nowPlusThirtyMinutes = new Date(Date.now() + (30 * 60 * 1000) + (60 * 60 * 1000)); // Current time + 30 minutes
      const now = new Date(Date.now() + (60 * 60 * 1000));
  
      const reservations = await Reservation.findAll({
        where: {
          date_entree: {
            [Sequelize.Op.eq]:  new Date(nowPlusThirtyMinutes.toISOString().split('T')[0]),
          },
          heure_entree: {
            [Sequelize.Op.and]: {
              [Sequelize.Op.lte]: nowPlusThirtyMinutes.toISOString().split('T')[1].slice(0, 5),
              [Sequelize.Op.gt]: now.toISOString().split('T')[1].slice(0, 5),
            },
          },
        },
        include: [
          {
            model: User,
            as: 'conducteur',
            attributes: ['token'],
          },
          {
            model: Parking,
            as: 'parking',
            attributes: ['nom'], 
          },
        ],
      });
      // console.log('Reservations found:', reservations);
  
      const tokens = reservations
        .filter((reservation) => reservation.conducteur.token !== null) // Filter out reservations without tokens
        .map((reservation) => reservation.conducteur.token); // Extract tokens from reservations
      
      // console.log('Tokens:', tokens);
  
      if (tokens.length > 0) {
        const promises = reservations.map(async (reservation) => {
          try {
            // console.log('reservation.date_entree:', reservation.date_entree);
            const messageBody = `Remember your coming reservation for parking ${reservation.parking.nom} in less than 30min.`;
            await sendNotificationToTokens([reservation.conducteur.token], 'Reservation Reminder', messageBody);
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        });
  
        await Promise.all(promises); // Wait for all notifications to be sent
        res.json({ message: 'Notifications sent successfully' });
      } else {
        res.status(404).json({ error: 'No tokens found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  const update = async (req, res) => {
    const { email, token } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        user.token = token;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating token', error });
    }
  }
  ;

  module.exports = { sendNotifications,update };