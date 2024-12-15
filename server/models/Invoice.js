const mongoose = require('mongoose')
const { createSearchIndex } = require('./Businessinfo')

const invoiceSchema=mongoose.Schema({
    businessId: {type:mongoose.Schema.Types.ObjectId,ref:'Business',required:true},
    customer:{
        name: {type: String, required:true},
        email:{type: String, required:true},
        phonenumber: {type:String, required: true}
    },
    product:[{
        name: {type: String, required:true},
        quantity:{type: Number, required:true},
        total: {type:String, required: true},
        price: {type: Number, required:true}
    }],
    totalamount:{type: Number, required:true},
    pdfInvoice: {type:String,required:true},
    discount: {type: Number, required:true, default: 0},
    finalamount:{type:Number,required:true},
    createdAt: {type: Date, default: Date.now()}
})

const Invoice=mongoose.model('Invoice',invoiceSchema);

module.exports = Invoice;