const express = require('express');
const { details } = require('../handlers');

const router = express.Router();

router.post('/', details.addUserIdentity );
router.post('/eth', details.addUserByEthAddress );
router.put('/', details.updateUserIdentity );

module.exports = router;
