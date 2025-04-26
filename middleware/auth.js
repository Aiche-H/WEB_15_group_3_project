const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Hae token headerista
        const token = req.header('Authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Ei autentikaatiota' });
        }

        // Tarkista token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Lisää käyttäjän ID requestiin
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        console.error('Autentikaation virhe:', error);
        res.status(401).json({ error: 'Virheellinen token' });
    }
};

module.exports = auth; 