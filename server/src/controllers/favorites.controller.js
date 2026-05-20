const db = require('../db');

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Join favorites with templates
    const favorites = await db('favorites')
      .join('templates', 'favorites.template_id', '=', 'templates.id')
      .where('favorites.user_id', userId)
      .select('templates.*', 'favorites.created_at as favorited_at');

    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { templateId } = req.params;

    // Check if template exists
    const template = await db('templates').where({ id: templateId }).first();
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check if already favorited
    const existing = await db('favorites').where({ user_id: userId, template_id: templateId }).first();
    if (existing) {
      return res.status(400).json({ error: 'Template already in favorites' });
    }

    await db('favorites').insert({
      user_id: userId,
      template_id: templateId
    });

    res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { templateId } = req.params;

    const deletedRows = await db('favorites')
      .where({ user_id: userId, template_id: templateId })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
