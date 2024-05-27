const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName} = req.body;
    console.log(req.body);
    console.log( email, password, firstName, lastName);
    // Check if the email already exists
    const existingUser = await User.findOne({
      where: { email , firstName, lastName},
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      email:email,
      password: hashedPassword,
      firstname:firstName,
      lastname:lastName,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    console.log( email, password);

    // Find the user by email
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the given password with the stored hash
    console.log(password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'isMatch Invalid credentials' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { register, login };
