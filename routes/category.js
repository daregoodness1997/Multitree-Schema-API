const express = require('express');
const { addCategory, getAllCategory, getDecedantCategory } = require('../controllers/category');
const router = express.Router();

router.route('/').post(addCategory).get(getAllCategory);
router.route('/descendants').get(getDecedantCategory);

module.exports = router;
