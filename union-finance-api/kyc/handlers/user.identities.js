const { User } = require('../models');

exports.addUserIdentity = async ( req, res ) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    birthdate,
    nationality,
    countryCode,
    phone,
    occupation
  } = req.body;

  try {
    let identity;
    let user = await User.findOne( {
      where: {
        email
      }
    } );

    if ( !user ) {
      user = await User.create( {
        email, phone
      } );

      identity = await user.createUserIdentity( {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthdate: new Date( birthdate ),
        nationality,
        country_code: countryCode,
        occupation
      } );
    } else {
      await user.set( {
        phone
      } ).save();

      identity = await user.getUserIdentity( {
        where: {
          user_id: user.id
        }
      } );

      await identity.set( {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthdate: new Date( birthdate ),
        nationality,
        country_code: countryCode,
        occupation
      } ).save();
    }

    const identityJSON = ( await user.getUserIdentity( {
      where: {
        id: identity.id
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
      code: 'NEW_IDENTITY',
      message: 'Identity Created',
      data: identityJSON
    } );

  } catch (error) {
    if ( error.original.code === 'ER_DUP_ENTRY' ) {
      const user = await User.findOne( {
        where: {
          email
        }
      } );
      res.status( 500 ).json( {
        type: 'Error',
        code: 'NEW_IDENTITY',
        message: `An error has occured. ${error.message}`,
        duplicate_user: user.toJSON()
      } );
    } else {
      res.status( 500 ).json( {
        type: 'Error',
        code: 'NEW_IDENTITY',
        message: `An error has occured. ${error.message}`,
        error: error
      } );
    }
  }
};

exports.addUserByEthAddress = async ( req, res ) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    birthdate,
    nationality,
    countryCode,
    phone,
    occupation,
    eth_address
  } = req.body;

  try {
    let identity;
    let user = await User.findOne( {
      where: {
        eth_address
      }
    } );

    if ( !user ) {
      user = await User.create( {
        email, phone, eth_address
      } );

      identity = await user.createUserIdentity( {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthdate: new Date( birthdate ),
        nationality,
        country_code: countryCode,
        occupation
      } );
    } else {
      await user.set( {
        phone
      } ).save();

      identity = await user.getUserIdentity( {
        where: {
          user_id: user.id
        }
      } );

      await identity.set( {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthdate: new Date( birthdate ),
        nationality,
        country_code: countryCode,
        occupation
      } ).save();
    }

    const identityJSON = ( await user.getUserIdentity( {
      where: {
        id: identity.id
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
      code: 'NEW_IDENTITY',
      message: 'Identity Created',
      data: identityJSON
    } );

  } catch (error) {
    if ( error.original.code === 'ER_DUP_ENTRY' ) {
      const user = await User.findOne( {
        where: {
          email
        }
      } );
      res.status( 500 ).json( {
        type: 'Error',
        code: 'NEW_IDENTITY',
        message: `An error has occured. ${error.message}`,
        duplicate_user: user.toJSON()
      } );
    } else {
      res.status( 500 ).json( {
        type: 'Error',
        code: 'NEW_IDENTITY',
        message: `An error has occured. ${error.message}`,
        error: error
      } );
    }
  }
};

exports.updateUserIdentity = async ( req, res ) => {
  const {
    uuid,
    firstName,
    middleName,
    lastName,
    birthdate,
    nationality,
    countryCode,
    phone,
    occupation
  } = req.body;

  try {
    const user = await User.findOne( { where: { uuid } } );

    if ( !user ) {
      res.status( 404 ).json( {
        type: 'Error',
        code: 'UPDATE_IDENTITY',
        message: 'An error has occured',
        data: 'User not found'
      } );
    } else {
      await user.set( {
        phone
      } ).save();

      const identity = await user.getUserIdentity( {
        where: {
          user_id: user.id
        }
      } );

      await identity.set( {
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        birthdate: new Date( birthdate ),
        nationality,
        country_code: countryCode,
        occupation
      } ).save();

      const identityJSON = ( await user.getUserIdentity( {
        where: {
          id: identity.id
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
        code: 'UPDATE_IDENTITY',
        message: 'Identity Updated',
        data: identityJSON
      } );

    }

  } catch (error) {
    res.status( 500 ).json( {
      type: 'Error',
      code: 'UPDATE_IDENTITY',
      message: `An error has occured. ${error.message}`,
      error: error
    } );
  }
};