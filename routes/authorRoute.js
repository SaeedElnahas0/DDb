const express = require('express');
const router = express.Router();
const { 
    createAuthor,
    getAllAuthors,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.patch('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;