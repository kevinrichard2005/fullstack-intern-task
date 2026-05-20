const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const templatesRoutes = require('./routes/templates.routes');
const favoritesRoutes = require('./routes/favorites.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templatesRoutes);
app.use('/api/favorites', favoritesRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
