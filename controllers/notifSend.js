const User = require('../models/User');
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
getRegistrationTokens().then(tokens => {
    if (tokens.length > 0) {
      sendNotificationToTokens(tokens, 'Hello World', 'This is a notification message.');
    } else {
      console.log('No tokens found.');
    }
  }).catch(error => {
    console.error('Error:', error);
  });