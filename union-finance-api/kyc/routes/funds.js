const express = require('express');
const { funds } = require('../handlers');

const router = express.Router();

router.post('/', funds.addUserFund );

module.exports = router;
