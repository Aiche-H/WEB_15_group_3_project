const User = require('../../models/user');
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
  try {
    console.log('GET /api/users called');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collection:', User.collection.collectionName);
    const users = await User.find();
    console.log('Users found:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers };

