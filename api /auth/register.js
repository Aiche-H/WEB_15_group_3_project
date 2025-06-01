const connectDB = require('../../db');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();
        const { email, username, password } = req.body;

        // Tarkista, että kaikki vaaditut kentät on annettu
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'Kaikki kentät ovat pakollisia.' });
        }

        // Tarkista, onko käyttäjä jo olemassa
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ error: 'Sähköposti tai käyttäjätunnus on jo käytössä.' });
        }

        // Hashaa salasana
        const hashedPassword = await bcrypt.hash(password, 10);

        // Luo uusi käyttäjä
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            first_name: '',
            last_name: '',
            // Voit lisätä muita kenttiä halutessasi, esim. avatar, role jne.
        });

        await newUser.save();
        console.log('[Auth Debug] Uusi käyttäjä luotu:', newUser);

        // Luo JWT-token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Rekisteröityminen onnistui',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('[Auth Debug] Registration error:', error);
        res.status(500).json({ error: 'Palvelinvirhe rekisteröinnissä.' });
    }
};
