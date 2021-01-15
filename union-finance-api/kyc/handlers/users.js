const { User } = require('../models');

exports.getUserByEth = async ( req, res ) => {
  const { eth_address } = req.params;
  try {
    const user = await User.findOne( {
      where: {
        eth_address
      }
    } );

    if ( !user ) {
      res.status( 404 ).json( {
        message: 'User not found'
      } );
    } else {

      const document = await user.getUserDocument();

      res.json( {
        message: 'User found',
        user: user.toJSON(),
        synaps: document.toJSON()
      } );
    }
  } catch (error) {
    res.status( 500 ).json( {
      message: error.message,
      error
     } );
  }
};

exports.getUsersInfoByUuid = async ( req, res ) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne( {
      where: {
        uuid
      }
    } );

    if ( !user ) {
      res.status( 404 ).json( {
        message: 'User not found'
      } );
    } else {
      const identity = await user.getUserIdentity();
      const address = await user.getUserLocation();
      const document = await user.getUserDocument();
      const funds = await user.getUserFund();

      const data = {
        user: user.toJSON()
      }

      if ( identity ) data.identity = identity.toJSON();
      if ( address ) data.address = address.toJSON();
      if ( document ) data.document = document.toJSON();
      if ( funds ) data.funds = funds.toJSON();

      res.json( {
        message: 'User found',
        data
      } );
    }
  } catch (error) {
    res.status( 500 ).json( {
      message: error.message,
      error
     } );
  }
};
