const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/users'));

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server due to database connection error:', err);
    process.exit(1);
  }
};

startServer();

