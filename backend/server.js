// server/server.js
// Entry point.
// Connects to DB first, then starts the HTTP server.
// This order prevents the server from accepting requests before DB is ready.

const app       = require('./app');
const connectDB = require('./config/database');
const ENV       = require('./config/env');

async function start() {
  console.log('═══════════════════════════════════════════════');
  console.log('  WebieApp Solutions LLC — API Server');
  console.log(`  Environment: ${ENV.NODE_ENV}`);
  console.log('═══════════════════════════════════════════════');

  // 1. Connect to MongoDB
  await connectDB();

  // 2. Start HTTP server
  const server = app.listen(ENV.PORT, () => {
    console.log(`[SERVER] ✅ Running on port ${ENV.PORT}`);
    console.log(`[SERVER] 🌐 http://localhost:${ENV.PORT}`);
    console.log(`[SERVER] 📊 Health: http://localhost:${ENV.PORT}/api/health`);
  });

  // 3. Graceful shutdown handlers
  const shutdown = (signal) => {
    console.log(`\n[SERVER] ${signal} received. Shutting down gracefully…`);
    server.close(() => {
      console.log('[SERVER] HTTP server closed.');
      process.exit(0);
    });
    // Force close after 10s
    setTimeout(() => {
      console.error('[SERVER] Forced shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));

  // 4. Unhandled rejections
  process.on('unhandledRejection', (err) => {
    console.error('[SERVER] Unhandled rejection:', err.message);
    server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (err) => {
    console.error('[SERVER] Uncaught exception:', err.message);
    process.exit(1);
  });
}

start();
