const express = require('express');
const router = express.Router();
const { 
    createAgg,
    addField,
    group,
    match,
    unwind,
    project,
    lookup,
    softDeleteAgg,
    getAllAggs
} = require('../controllers/aggController');

router.post('/', createAgg);
router.get('/addFields', addField);
router.get('/group', group);
router.get('/match', match);
router.get('/unwind', unwind);
router.get('/project', project);
router.get('/lookup', lookup);
router.get('/', getAllAggs);
router.delete('/softDelete/:id', softDeleteAgg);

module.exports = router;