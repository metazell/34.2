const express = require('express');
const itemsRoutes = require('./routes/items');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the items routes
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({ error: "Not Found" });
});

// General error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message || "Internal Server Error",
  });
});

module.exports = app;
