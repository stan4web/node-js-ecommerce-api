const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    purchaseDate: { type: Date, default: new Date()}
});

module.exports = mongoose.model('Purchase', purchaseSchema);