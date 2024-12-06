const mongoose=require('mongoose')

const BusinessSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    logo: { type: String },
    bio: { type: String },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gstNumber: { type: String },
  });
  
  const Business = mongoose.model('Business', BusinessSchema);
  
  module.exports = Business ;