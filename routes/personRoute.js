const express = require('express');
const router = express.Router();
const { 
    createPerson,
    getAllPersons,
    getSinglePerson,
    updatePerson,
    deletePerson
} = require('../controllers/personController');

router.post('/', createPerson);
router.get('/', getAllPersons);
router.get('/:id', getSinglePerson);
router.patch('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;