const util = require('util');
const connectDB = require('../../db');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    console.log('[Auth Debug] register.js kutsuttu, req.method:', req.method);
    if (req.method !== 'POST') {
        console.log('[Auth Debug] Väärä HTTP-metodi:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log('[Auth Debug] Yritetään yhdistää tietokantaan...');
        await connectDB();
        console.log('[Auth Debug] Tietokantayhteys OK');

        const { email, username, password, first_name, last_name } = req.body;
        console.log('[Auth Debug] Saapunut req.body:', req.body);

        // Tarkista, että kaikki vaaditut kentät on annettu
        if (!email || !username || !password || !first_name || !last_name) {
            console.log('[Auth Debug] Puuttuva kenttä:', { email, username, password, first_name, last_name });
            return res.status(400).json({ error: 'Kaikki kentät ovat pakollisia.' });
        }

        // Tarkista, onko käyttäjä jo olemassa
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        console.log('[Auth Debug] existingUser:', existingUser);
        if (existingUser) {
            console.log('[Auth Debug] Sähköposti tai käyttäjätunnus on jo käytössä:', { email, username });
            return res.status(409).json({ error: 'Sähköposti tai käyttäjätunnus on jo käytössä.' });
        }

        // Hashaa salasana
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('[Auth Debug] Hashed password:', hashedPassword);

        // Luo uusi käyttäjä
        const now = new Date();
        const newUserData = {
            email,
            username,
            password: hashedPassword,
            first_name,
            last_name,
            role: 'user',
            avatar: '',
            registration_date: now,
            last_login: now,
            last_activity: now,
            email_verification: false,
            verification_token: '',
            lastVisits: []
        };
        console.log('[Auth Debug] newUserData:', newUserData);
        const newUser = new User(newUserData);
        console.log('[Auth Debug] newUser mongoose model:', newUser);

        await newUser.save();
        console.log('[Auth Debug] Uusi käyttäjä tallennettu:', newUser);

        // Luo JWT-token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log('[Auth Debug] JWT-token luotu:', token);

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
        if (error.errInfo && error.errInfo.details) {
            try {
                console.error('[Auth Debug] Validation details:', JSON.stringify(error.errInfo.details, null, 2));
            } catch (e) {
                console.error('[Auth Debug] Validation details (raw):', error.errInfo.details);
            }
            Object.keys(error.errInfo.details).forEach(key => {
                console.error(`[Auth Debug] details[${key}]:`, util.inspect(error.errInfo.details[key], { depth: 10 }));
            });
            if (error.errInfo.details.schemaRulesNotSatisfied) {
                console.error('[Auth Debug] schemaRulesNotSatisfied:', JSON.stringify(error.errInfo.details.schemaRulesNotSatisfied, null, 2));
                error.errInfo.details.schemaRulesNotSatisfied.forEach((rule, idx) => {
                    console.error(`[Auth Debug] schemaRulesNotSatisfied[${idx}]:`, JSON.stringify(rule, null, 2));
                    console.error(`[Auth Debug] schemaRulesNotSatisfied[${idx}] (inspect):`, util.inspect(rule, { depth: 10 }));
                });
            }
        }
        try {
            console.error('[Auth Debug] Full error:', JSON.stringify(error, null, 2));
        } catch (e) {
            console.error('[Auth Debug] Full error (raw):', error);
        }
        res.status(500).json({ error: 'Palvelinvirhe rekisteröinnissä.' });
    }
};
