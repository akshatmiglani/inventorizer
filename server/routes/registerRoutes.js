const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const xlsx = require('xlsx');
const fs = require('fs');
const User = require('../models/User');
const Business = require('../models/Businessinfo');
const Product = require('../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.post('/', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'products', maxCount: 1 }]), async (req, res) => {
        console.log(req.body);
        const { email, password, businessName, address, gstNumber } = req.body;

        try {

            // Create User

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered' });
            }

            const newUser = new User({ email, password });
            await newUser.save();

            // Business Details

            const logoPath = req.files['logo'] ? req.files['logo'][0].path : null;

            const newBusiness = new Business({
                userId: newUser._id,
                businessName,
                email,
                address,
                gstNumber,
                logo: logoPath,
            })

            await newBusiness.save();

            if (req.files['products']) {
                const productsFilePath = req.files['products'][0].path;
                const workbook = xlsx.readFile(productsFilePath);
                const sheetName = workbook.SheetNames[0];
                const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                const products = data.map(row => ({
                    name: row['Product'],
                    quantity: row['Quantity'],
                }));
                console.log(products);

                const newProduct = new Product({
                    businessId: newBusiness._id,
                    products,
                });

                await newProduct.save();

                fs.unlinkSync(productsFilePath);

            };

            return res.status(201).json({ message: 'Registration successful!' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    })

module.exports = router;