const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Reitit
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ... existing code ... 