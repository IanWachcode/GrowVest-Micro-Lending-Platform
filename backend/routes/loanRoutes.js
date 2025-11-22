const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createLoan,
  getLoans,
  getLoan,
  updateLoan,
  deleteLoan
} = require('../controllers/loanController');

router.post('/', protect, createLoan);
router.get('/', protect, getLoans);
router.get('/:id', protect, getLoan);
router.put('/:id', protect, updateLoan);
router.delete('/:id', protect, deleteLoan);

module.exports = router;
module.exports = app;

