const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true}
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);