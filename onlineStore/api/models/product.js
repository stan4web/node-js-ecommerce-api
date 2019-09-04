const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    name: {type: String, required: true},
    description: {type: String},
    sellPrice: {type: Number, required: true},
    costPrice: {type: Number, required: true},
    trackStock: {type: Boolean, default: false},
    isActive: {type: Boolean, default: false}, 
    productImage: {type: String},
    entryDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Product', productSchema);