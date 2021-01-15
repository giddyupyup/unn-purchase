const express = require('express');

const Router = express.Router();

Router.use( '/users', require( './users' ) );
Router.use( '/users/identity', require( './identities' ) );
Router.use( '/users/location', require( './locations' ) );
Router.use( '/users/document', require( './documents' ) );
Router.use( '/users/fund', require( './funds' ) );
Router.use( '/sync/synaps', require( './synaps') );

module.exports = Router;