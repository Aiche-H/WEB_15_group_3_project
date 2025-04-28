// middleware/adminAuth.js

const User = require('../models/user');

const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Pääsy kielletty - vaaditaan admin-oikeudet' });
        }
        next();
    } catch (error) {
        console.error('Admin-tarkistuksen virhe:', error);
        res.status(500).json({ error: 'Virhe admin-tarkistuksessa' });
    }
};

module.exports = adminAuth;