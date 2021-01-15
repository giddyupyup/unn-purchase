const express = require( 'express' );
const logger = require( 'morgan' );
const cors = require( 'cors' );

const app = express();

app.use( logger( 'dev' ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.use( cors() );

app.use( '/api', require( './routes' ) );

app.use((req, res, next ) => {
  const error = new Error('Not Found');
  error.status = 404;
  next( error );
} );

app.use( ( err, req, res, next ) => {
  res.status( err.status || 500 );
  res.json( {
    error: {
      message: err.message
    }
  } );
} );

module.exports = app;