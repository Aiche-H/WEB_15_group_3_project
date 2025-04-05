// routes/users.js
const express = require('express');
const router = express.Router();

// PUT operation
const putUsers = require('../database/methods/PUT');
// POST operation
const postUsers = require('../database/methods/POST');
// GET operation
const getUsers = require('../database/methods/GET');
// DELETE operation
const deleteUsers = require('../database/methods/DELETE');

// Update user
router.put('/:id', putUsers.updateUser);

// Create user
router.post('/', postUsers.createUser);

// Delete user
router.delete('/:id', deleteUsers.deleteUser);

// Get users
router.get('/', getUsers.getUsers);

module.exports = router;













