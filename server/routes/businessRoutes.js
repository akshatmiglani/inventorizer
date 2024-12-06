const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');
const Business = require('../models/Businessinfo');
const Product = require('../models/Product');

router.use(authMiddleware)

router.get('/getDetails', async (req, res) => {
    // console.log('Hi');
    // console.log('User ID from token:', req.user);

    try {
        const business = await Business.findOne({ userId: req.user.id })
        if (!business) {
            return res.status(404).json({ message: 'Business not found!' });
        }

        res.json({
            businessId: business._id,
            logo: business.logo,
            businessName: business.businessName,
            email: business.email,
            address: business.address,
            gstNumber: business.gstNumber,
          });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/:businessId/products', async (req, res) => {
    
    try {
        const { businessId } = req.params;
        const products = await Product.findOne({ businessId });

        if (!products) {
            return res.status(404).json({ message: 'No products found!' });
        }
        res.json({ products: products.products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.put('/:businessId/products/update', async (req, res) => {
    const { businessId } = req.params;
    // console.log('businessId from route:', businessId);
    const { name, quantityChange } = req.body;

    try {
        const products = await Product.findOne({ businessId });

        if (!products) {
            return res.status(404).json({ message: 'No products found!' });
        }

        const product = products.products.find(p => p.name === name);
        if (!product) {
            return res.status(404).json({ message: `Produt ${name} not found!` });
        }

        product.quantity += quantityChange;

        if (product.quantity < 0) {
            return res.status(400).json({ message: 'Stock cannot be negative' });
        }
        products.markModified('products');
        await products.save();
        res.json({ message: 'Stock updated successfully', products: products.products });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router;