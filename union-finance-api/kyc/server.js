require('dotenv').config();
const http = require( 'http' );

const app = require( './app' );
const db = require( './db' );

const port = process.env.PORT || 3001;
const server = http.createServer( app );

( async () => {
  try {
    await db();
    server.listen( port, () => console.log(`Express started on http://127.0.0.1:${port}\npress Ctrl+C to terminate.`) )
  } catch (error) {
    console.log( 'Error starting server', error );
  }
} )( server, port );