const express = require('express');
const { users } = require('../handlers');

const router = express.Router();

router.get('/eth/:eth_address', users.getUserByEth );
router.get('/uuid/:uuid', users.getUsersInfoByUuid );

module.exports = router;
