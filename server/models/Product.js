const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  products: { type: Array, required: true }, 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports =  Product ;
