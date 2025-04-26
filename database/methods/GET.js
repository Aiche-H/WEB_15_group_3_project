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

const getCurrentUser = async (req, res) => {
  try {
    // Käyttäjän ID on auth-middlewaren kautta req.userId:ssä
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'Käyttäjää ei löydy' });
    }

    res.json(user);
  } catch (err) {
    console.error('Virhe käyttäjän haussa:', err);
    res.status(500).json({ error: 'Käyttäjän tietojen haku epäonnistui' });
  }
};

module.exports = { 
  getUsers,
  getCurrentUser
};

