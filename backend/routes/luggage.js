const express = require('express');
const router = express.Router();

// Simple test route for now
router.get('/test', (req, res) => {
  res.json({ message: 'Luggage route is working!' });
});

// We'll add luggage functionality later
module.exports = router;