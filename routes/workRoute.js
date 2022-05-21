const express = require('express');
const router = express.Router();
const { 
    createWork,
    getAllWorks,
    getSingleWork,
    updateWork,
    deleteWork
} = require('../controllers/workController');

router.post('/', createWork);
router.get('/', getAllWorks);
router.get('/:id', getSingleWork);
router.patch('/:id', updateWork);
router.delete('/:id', deleteWork);

module.exports = router;