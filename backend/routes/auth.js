const express = require('express');
const router = express.Router();

// For now, just a simple route to test the backend is working
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

// We'll add real authentication later
module.exports = router;