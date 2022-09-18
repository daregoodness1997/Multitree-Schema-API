const express = require('express');
const { addCategory, getCategory } = require('../controllers/category');
const router = express.Router();

router.route('/').post(addCategory).get(getCategory);

module.exports = router;
