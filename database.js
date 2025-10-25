const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.set('strictQuery', false);

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log("✅ Connected to MongoDB server");
});

db.on('error', (err) => {
  console.error("❌ MongoDB connection failed:", err);
});

db.on('disconnected', () => {
  console.log("⚠️ MongoDB server disconnected");
});


module.exports= db;