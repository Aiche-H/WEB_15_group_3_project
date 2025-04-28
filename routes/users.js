const express = require('express');
const router = express.Router();
const auth = require('./routes_user_auth.js/auth.js');
const cors = require('cors');

// PUT operation
const putUsers = require('../database/methods/PUT');
// POST operation
const postUsers = require('../database/methods/POST');
// GET operation
const getUsers = require('../database/methods/GET');
// DELETE operation
const deleteUsers = require('../database/methods/DELETE');

// Kirjaudu sisään
router.post('/login', async (req, res) => {
    console.log('Kirjautumispyyntö saapunut:', req.body);
    try {
        console.log('Kutsutaan loginUser funktiota');
        await postUsers.loginUser(req, res);
        console.log('loginUser funktio suoritettu');
    } catch (error) {
        console.error('Kirjautumisvirhe:', error);
        res.status(401).json({ error: error.message });
    }
});

// Rekisteröidy
router.post('/register', async (req, res) => {
    console.log('Rekisteröitymispyyntö saapunut:', req.body);
    try {
        const result = await postUsers.registerUser(req.body);
        console.log('Rekisteröityminen onnistui:', result);
        res.json(result);
    } catch (error) {
        console.error('Rekisteröitymisvirhe:', error);
        res.status(400).json({ error: error.message });
    }
});

// Palauta salasana
router.post('/reset-password', postUsers.resetPassword);

// Hae nykyisen käyttäjän tiedot
router.get('/current', auth, async (req, res) => {
    console.log('Käyttäjätietojen haku pyyntö saapunut, userId:', req.userId);
    try {
        const result = await getUsers.getCurrentUser(req.userId);
        console.log('Käyttäjätiedot haettu:', result);
        res.json(result);
    } catch (error) {
        console.error('Käyttäjätietojen haun virhe:', error);
        res.status(500).json({ error: error.message });
    }
});

// Päivitä käyttäjä
router.put('/:id', auth, putUsers.updateUser);

// Luo käyttäjä
router.post('/', auth, postUsers.createUser);

// Poista käyttäjä
router.delete('/:id', auth, deleteUsers.deleteUser);

// Hae kaikki käyttäjät
router.get('/', auth, getUsers.getUsers);

module.exports = router;













