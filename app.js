const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const identifyRouter = require('./routes/identify');

dotenv.config();

const app = express();

app.use(express.json());

// Basic root route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// Use the identify route
app.use('/identify', identifyRouter);

// Sync DB and start server
db.sync()
  .then(() => {
    console.log('✅ DB synced!');
    app.listen(3000, () => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ Error syncing DB:', err);
  });
