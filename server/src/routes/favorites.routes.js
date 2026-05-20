const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favorites.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply authentication middleware to all favorites routes
router.use(authenticateToken);

router.get('/', getFavorites);
router.post('/:templateId', addFavorite);
router.delete('/:templateId', removeFavorite);

module.exports = router;
