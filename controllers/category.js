const Category = require('../models/category');
const buildAncestry = require('../utils/buildAncestry');

const addCategory = async (req, res) => {
  let parent = req.body.parent ? req.body.parent : null;

  const category = await Category.create({ name: req.body.name, parent });

  console.log(category._id);
  buildAncestry(category._id, req.body.parent);

  res.status(200).json({ category });
};

const getCategory = async (req, res) => {
  const category = await Category.find();
  res.status(200).json({ category });
};

module.exports = { addCategory, getCategory };
