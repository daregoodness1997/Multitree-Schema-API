const Category = require('../models/category');
const buildAncestry = require('../utils/buildAncestry');

const addCategory = async (req, res) => {
  let parent = req.body.parent ? req.body.parent : null;

  const category = await Category.create({ name: req.body.name, parent });

  console.log(category._id);
  buildAncestry(category._id, req.body.parent);

  res.status(200).json({ category });
};

const getAllCategory = async (req, res) => {
  const { slug } = req.query;
  const queryObject = {};
  queryObject;
  if (slug) {
    queryObject.slug = slug;
  }
  const category = await Category.find(queryObject);
  res.status(200).json({ nbHits: category.length, category });
};

const getDecedantCategory = async (req, res) => {
  const { category_id } = req.query;
  const queryObject = {};
  queryObject;
  if (category_id) {
    queryObject['ancestors._id'] = category_id;
  }

  const category = await Category.find({
    'ancestors._id': req.query.category_id,
  })
    .select({ _id: false, name: true })
    .exec();

  res.status(201).json({ nbHits: category.length, category });
};

module.exports = { addCategory, getAllCategory, getDecedantCategory };
