const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../Middlewares/Auth');

// Protected route for products
router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).json([
    { name: "mobile", price: 1000 },
    { name: "tablet", price: 20000 }
  ]);
});

module.exports = router;
