const express = require('express');
const { synaps } = require('../handlers');

const router = express.Router();

router.post('/', synaps.syncSynaps );
router.get('/:session', synaps.getSynapsStatus );

module.exports = router;
