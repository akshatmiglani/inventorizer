const express=require('express')
const multer=require('multer')
const {Product} = require('../models/Product')
const {authMiddleware} = require('../middleware/auth')
const xlsx=require('xlsx')
const router=express.Router();

const upload=multer({dest:'uploads/'});

router.use(authMiddleware);

router.post('/import',upload.single('file'),async(req,res)=>{
    try{
        const workbook=xlsx.readFile(req.file.path);
        const sheetName=workbook.SheetNames[0];
        const products=xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const productDoc=new Product({businessId:req.user.id,products});
        await productDoc.save();

        res.status(201).json({message:"Products imported successfully."})
    }catch(err){
        res.status(500).json({error:'Failed to import products'});
    }
})
