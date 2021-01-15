const express = require('express');
const { locations } = require('../handlers');

const router = express.Router();

router.post('/', locations.addUserLocation );

module.exports = router;
