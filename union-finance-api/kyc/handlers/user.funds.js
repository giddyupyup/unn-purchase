const { User } = require('../models');

exports.addUserFund = async ( req, res ) => {
  const {
    uuid,
    contribution,
    source,
    eth_address
  } = req.body;

  try {
    const user = await User.findOne( {
      where: {
        uuid
      }
    } );

    if ( !user ) {
      res.status( 404 ).json( {
        type: 'Error',
        code: 'NEW_FUND',
        message: 'An error has occured',
        data: 'User not found'
      } );
    } else {
      await user.set( { eth_address } ).save();

      let fund = await user.getUserFund();

      if ( fund ) {
        await fund.set( {
          contribution,
          source
        } ).save();
      } else {
        fund = await user.createUserFund( {
          contribution,
          source
        } );
      }

      const fundJSON = ( await user.getUserFund( {
        where: {
          id: fund.id
        },
        attributes: {
          exclude: ['user_id']
        },
        include: {
          model: User,
          as: 'user'
        }
      } ) ).toJSON();

      res.json( {
        type: 'Success',
        code: 'NEW_FUND',
        message: `New fund saved: ${ fund.id }`,
        data: fundJSON
      } );
    }

  } catch (error) {
    console.log( error );
    res.status( 500 ).json( {
      type: 'Error',
      code: 'NEW_FUND',
      message: `An error has occured. ${ error.message }`,
      error: error.errors[0]
    } );
  }
};