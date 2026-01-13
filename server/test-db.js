const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    console.log('Database:', mongoose.connection.name);
    process.exit(0);
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:');
    console.error(err.message);
    process.exit(1);
  });