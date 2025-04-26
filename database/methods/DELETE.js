// database/methods/DELETE.js
const User = require('../../models/user');
const mongoose = require('mongoose');

// Deletes a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Virheellinen käyttäjän ID' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Käyttäjää ei löydy' });
    }

    res.json({ message: 'Käyttäjä poistettu onnistuneesti', user: deletedUser });
  } catch (err) {
    console.error('Virhe käyttäjän poistossa:', err);
    res.status(500).json({ error: 'Käyttäjän poisto epäonnistui' });
  }
};

module.exports = { deleteUser };
