const { User } = require('../models');

exports.addUserLocation = async ( req, res ) => {
  const {
    uuid,
    address_1,
    address_2,
    city,
    country,
    zipcode,
    state
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
        code: 'NEW_LOCATION',
        message: 'An error has occured',
        data: 'User not found'
      } );
    } else {

      let location = await user.getUserLocation();

      if ( location ) {
        await location.set( {
          address_1,
          address_2,
          city,
          country,
          zipcode,
          state
        } ).save();
      } else {
        location = await user.createUserLocation( {
          address_1,
          address_2,
          city,
          country,
          zipcode,
          state
        } );
      }

      const locationJSON = ( await user.getUserLocation( {
        where: {
          id: location.id
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
        code: 'NEW_LOCATION',
        message: `New location saved: ${ location.id }`,
        data: locationJSON
      } );

    }
  } catch (error) {
    console.log( error );
    res.status( 500 ).json( {
      type: 'Error',
      code: 'NEW_LOCATION',
      message: `An error has occured. ${ error.message }`,
      error: error.errors[0]
    } );
  }
};