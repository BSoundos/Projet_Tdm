
const User = require('../models/User');


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

module.exports = { update };

