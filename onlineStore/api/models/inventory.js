const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Purchase', required: true },
    quantity: { type: Number, default: 1 },
    purchaseDate: { type: Date, default: new Date()}
});

module.exports = mongoose.model('Inventory', inventorySchema);