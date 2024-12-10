const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');
const Business = require('../models/Businessinfo');
const Product = require('../models/Product');
const path = require('path');
const { createInvoice } = require('../utils/createInvoice');
const { uploadToS3 } = require('../utils/s3Upload');
const Invoice = require('../models/Invoice');
const fs = require('fs');
const { sendInvoice } = require('../utils/sendMail');
router.use(authMiddleware)

const TEMP_DIR = "./temp";

router.post('/:businessId/new',async(req,res)=>{
    const {businessId} = req.params;

    const invoiceData = req.body;


    try {
        const businessData= await Business.findById(businessId);
        if(!businessData) return res.status(400).send("Business not found");

        const productData = await Product.findOne({ businessId });
        if (!productData) return res.status(404).json({ message: "No products found!" });
        const productUpdates = [];

        for (const product of invoiceData.products) {
            const dbProduct = productData.products.find(p => p.name === product.name);
            if (!dbProduct) {
                return res.status(400).json({ message: `Product ${product.name} not found!` });
            }

            if (dbProduct.quantity < product.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}. Available: ${dbProduct.quantity}, Requested: ${product.quantity}`,
                });
            }

            productUpdates.push({
                name: product.name,
                quantity: dbProduct.quantity - product.quantity,
            });
        }

        if(!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

        const invoiceFileName=`invoice_${Date.now()}.pdf`
        const invoicePath=path.join(TEMP_DIR,invoiceFileName);

        await createInvoice(invoiceData,businessData,invoicePath);

        const s3Bucket=process.env.S3_BUCKET_NAME;
        const s3Key=`invoices/${invoiceFileName}`;
        const fileUrl = await uploadToS3(invoicePath,s3Bucket,s3Key);
        await sendInvoice(invoiceData.customer.email,businessData,fileUrl);

        fs.unlinkSync(invoicePath);

        const newInvoice = new Invoice({
            businessId: businessId,
            customer: invoiceData.customer,
            product: invoiceData.products,
            totalamount: invoiceData.totalAmount,
            pdfInvoice: fileUrl,
          });
      
        const savedInvoice = await newInvoice.save();

        for (const update of productUpdates) {
            const product = productData.products.find(p => p.name === update.name);
            if (product) {
                product.quantity = update.quantity;
            }
        }


        productData.markModified('products');
        await productData.save();
      
        res.status(200).json({
            message: "Invoice generated and saved successfully.",
            invoice: savedInvoice,
            fileUrl: fileUrl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error generating invoice",error:error.message});
    }
})

router.get('/:businessId/invoices',async(req,res)=>{
    try {
        const {businessId} = req.params;

        const invoices = await Invoice.find({businessId});
        // console.log('Invoices:', invoices);
        

        res.status(200).json(invoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:'Server Error'
        });
    }
})
module.exports = router;