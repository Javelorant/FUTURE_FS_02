// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const { auth } = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);           // Auth routes (register/login)

// Protect the main CRM routes with JWT middleware
app.use('/api/contacts', auth, require('./routes/contacts'));
app.use('/api/deals', auth, require('./routes/deals'));
app.use('/api/activities', auth, require('./routes/activities'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Mini CRM API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
