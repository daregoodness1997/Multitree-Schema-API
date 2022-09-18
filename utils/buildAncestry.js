const Category = require('../models/category');

const buildAncestry = async (id, parent_id) => {
  let ancest = [];
  let parent_category = await Category.findOne(
    { _id: parent_id },
    { name: 1, slug: 1, ancestors: 1 }
  );

  if (parent_category) {
    const { _id, name, slug } = parent_category;
    ancest = [...parent_category.ancestors];
    ancest.unshift({ _id, name, slug });
    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: { ancestors: ancest },
      },
      { new: true, runValidators: true }
    );
  }
};

module.exports = buildAncestry;
