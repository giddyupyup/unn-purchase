const express = require('express');
// const multer = require('multer');
const { documents } = require('../handlers');

// const upload = multer( { dest: 'uploads/'} );
const router = express.Router();

// router.use( upload.single( 'document' ) );

router.post('/', documents.addUserDocument );
router.put('/', documents.updateUserIdentityVerification );
router.get('/update_synaps/:api_key', documents.updateUserIdentitySynapsState );

module.exports = router;
