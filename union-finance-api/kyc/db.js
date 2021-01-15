const { sequelize } = require( './models' );
const env = process.env.NODE_ENV || 'dev';

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.' );
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit( 1 );
  }

  if ( env === 'dev' ) await sequelize.sync();
};