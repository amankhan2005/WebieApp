// config/database.js
// MongoDB connection with retry logic, event logging, and graceful shutdown.

const mongoose = require('mongoose');
const ENV      = require('./env');

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS:          45000,
  maxPoolSize:              10,
  minPoolSize:              2,
};

let retries = 0;
const MAX_RETRIES = 5;

async function connectDB() {
  try {
    await mongoose.connect(ENV.MONGODB_URI, CONNECT_OPTIONS);
    retries = 0;
    console.log(`[DB] ✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    retries++;
    console.error(`[DB] ❌ Connection failed (attempt ${retries}/${MAX_RETRIES}): ${err.message}`);

    if (retries < MAX_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, retries), 30000);
      console.log(`[DB] Retrying in ${delay / 1000}s…`);
      setTimeout(connectDB, delay);
    } else {
      console.error('[DB] Maximum retries reached. Exiting.');
      process.exit(1);
    }
  }
}

mongoose.connection.on('connected',    () => console.log('[DB] Mongoose connected'));
mongoose.connection.on('disconnected', () => {
  console.warn('[DB] Mongoose disconnected. Attempting reconnect…');
  connectDB();
});
mongoose.connection.on('error', (err) => console.error('[DB] Mongoose error:', err.message));

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[DB] Connection closed on app termination');
  process.exit(0);
});

module.exports = connectDB;
