const express = require('express');
const router = express.Router();
const { 
    createSsn,
    getAllSsn,
    getSingleSsn,
    updateSsn,
    deleteSsn
} = require('../controllers/snnController');

router.post('/', createSsn);
router.get('/', getAllSsn);
router.get('/:id', getSingleSsn);
router.patch('/:id', updateSsn);
router.delete('/:id', deleteSsn);

module.exports = router;