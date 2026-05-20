const db = require('../db');

const getTemplates = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = db('templates').select('*');

    if (category) {
      query = query.where('category', category);
    }

    if (search) {
      query = query.where('name', 'like', `%${search}%`)
                   .orWhere('description', 'like', `%${search}%`);
    }

    const templates = await query;
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await db('templates').where({ id }).first();

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTemplates,
  getTemplateById
};
