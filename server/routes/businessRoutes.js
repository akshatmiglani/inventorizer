const express = require('express');
const { Business } = require('../models/Business');
const {authMiddleware} = require('../middleware/auth')
const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
      const business = new Business({ ...req.body, userId: req.user.id });
      await business.save();
      res.status(201).json({ message: 'Business details saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save business details' });
    }
  });
  
  module.exports = router;