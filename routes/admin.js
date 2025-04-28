const express = require('express');
const router = express.Router();
const User = require('../models/user');
const PageView = require('../models/adminPageView');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Käyttäjien haku (vain admin)
router.get('/users', [auth, adminAuth], async (req, res) => {
    try {
        const users = await User.find()
            .select('username email registration_date role')
            .sort({ registration_date: -1 });
        res.json(users);
    } catch (error) {
        console.error('Käyttäjien haun virhe:', error);
        res.status(500).json({ error: 'Virhe käyttäjien haussa' });
    }
});

// Tilastotietojen haku (vain admin)
router.get('/statistics', [auth, adminAuth], async (req, res) => {
    try {
        // Käyttäjien kokonaismäärä
        const totalUsers = await User.countDocuments();
        
        // Uudet käyttäjät tänään
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newUsersToday = await User.countDocuments({
            registration_date: { $gte: today }
        });
        
        // Aktiiviset käyttäjät (viimeisen 24h aikana)
        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            last_activity: { $gte: last24h }
        });
        
        // Sivunäyttöjen määrä
        const pageViews = await PageView.countDocuments();
        
        res.json({
            totalUsers,
            newUsersToday,
            activeUsers,
            pageViews
        });
    } catch (error) {
        console.error('Tilastotietojen haun virhe:', error);
        res.status(500).json({ error: 'Virhe tilastotietojen haussa' });
    }
});

// Käyttäjän roolin muutos (vain admin)
router.put('/users/:id/role', [auth, adminAuth], async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Virheellinen rooli' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'Käyttäjää ei löydy' });
        }

        res.json(user);
    } catch (error) {
        console.error('Roolin muutoksen virhe:', error);
        res.status(500).json({ error: 'Virhe roolin muutoksessa' });
    }
});

module.exports = router;