const mongoose = require('mongoose');
const User = require('../../models/user');

// Updates user information
const updateUser = async (req, res) => {
  try {
    // Print original ID and after trimming
    console.log('Original ID:', req.params.id);
    const userId = req.params.id.trim();
    console.log('ID after trimming:', userId);

    // Check if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Error: ID is not valid');
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    // Debug: list all users in database
    const allUsers = await User.find({});
    console.log('All users in database:', allUsers);

    const objectId = new mongoose.Types.ObjectId(userId);

    // Get user before update
    const existingUser = await User.findById(objectId);
    console.log('User fetched from database before update:', existingUser);

    if (!existingUser) {
      console.log('User not found before update');
      return res.status(404).json({ message: 'User not found!' });
    }

    console.log('Update data:', req.body);

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      req.body,
      { new: true, runValidators: true }
    );

    console.log('Updated user:', updatedUser);

    if (!updatedUser) {
      console.log('User not found after update');
      return res.status(404).json({ message: 'User not found!' });
    }

    console.log('Sending response:', updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error in update:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateUser };


