const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getSavings,
  deposit,
  withdraw,
  getTransactions
} = require('../controllers/savingsController');

// Get user savings
router.get('/', protect, getSavings);

// Deposit money
router.post('/deposit', protect, deposit);

// Withdraw money
router.post('/withdraw', protect, withdraw);

// Get transaction history
router.get('/transactions', protect, getTransactions);

module.exports = router;
module.exports = app;
