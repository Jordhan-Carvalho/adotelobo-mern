const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DB
connectDB();

// Init Middleware
// BodyParsers now included on express, so instead of using it, we now use
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/animals', require('./routes/api/animals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
