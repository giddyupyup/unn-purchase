const devConfig = require( '../config/config.dev' );
const prodConfig = require( '../config/config.prod' );

module.exports = {
  development: devConfig.db,
  production: prodConfig.db
}