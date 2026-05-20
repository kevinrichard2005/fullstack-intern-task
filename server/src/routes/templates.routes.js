const express = require('express');
const { getTemplates, getTemplateById } = require('../controllers/templates.controller');

const router = express.Router();

router.get('/', getTemplates);
router.get('/:id', getTemplateById);

module.exports = router;
