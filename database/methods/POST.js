// database/methods/POST.js
const User = require('../../models/user');

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log('Added user:', savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createUser };

