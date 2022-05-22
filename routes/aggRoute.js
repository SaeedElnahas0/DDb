const express = require('express');
const router = express.Router();
const { 
    createAgg,
    addField,
    group,
    match,
    unwind,
    project,
    lookup
} = require('../controllers/aggController');

router.post('/', createAgg);
router.get('/addFields', addField);
router.get('/group', group);
router.get('/match', match);
router.get('/unwind', unwind);
router.get('/project', project);
router.get('/lookup', lookup);

module.exports = router;