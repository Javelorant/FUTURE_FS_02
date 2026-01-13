const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const contactsRoutes = require('./routes/contacts');
const dealsRoutes = require('./routes/deals');
const activitiesRoutes = require('./routes/activities');
const { auth } = require('./middleware/auth');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Auth routes (register/login)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/contacts', auth, contactsRoutes);
app.use('/api/deals', auth, dealsRoutes);
app.use('/api/activities', auth, activitiesRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'API is running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
