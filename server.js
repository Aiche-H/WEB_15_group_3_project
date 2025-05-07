require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
const contactRoutes = require('./routes/contactform');

// Yhdistä MongoDB
connectDB();

// Middleware JSON-body parsing
app.use(express.json());

// Reitit
app.use(contactRoutes);

// Staattiset tiedostot (HTML, CSS, JS clientille)
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));