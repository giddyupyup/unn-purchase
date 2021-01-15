const { User, UserDocument } = require('../models');
const { synapsApi } = require('../utils/third_party_api');

exports.addUserDocument = async ( req, res ) => {
  const {
    uuid
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
        code: 'NEW_DOCUMENT',
        message: 'An error has occured',
        data: 'User not found'
      } );
    } else {
      let document = await user.getUserDocument();

      if( !document ) {
        const synaps = await synapsApi.post( '/session/init', {}, {
          headers: {
            'Api-Key': process.env.SYNAPS_API_KEY
          }
        } );

        document = await user.createUserDocument( {
          session_id: synaps.data.session_id,
          user_timestamp: user.updated_at
        } );
      }

      const documentJSON = ( await user.getUserDocument( {
        where: {
          id: document.id
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
        code: 'NEW_DOCUMENT',
        message: `New document saved: ${ document.id }`,
        data: documentJSON
      } );
    }
  } catch (error) {
    console.log( error );
    res.status( 500 ).json( {
      type: 'Error',
      code: 'NEW_DOCUMENT',
      message: `An error has occured. ${ error.message }`,
      error: error.message
    } );
  }
};

exports.updateUserIdentityVerification = async ( req, res ) => {
  const { uuid } = req.body;

  try {
    const user = await User.findOne( {
      where: { uuid }
    } );

    if ( !user ) {
      res.status( 404 ).json( {
        type: 'Error',
        code: 'UPDATE_DOCUMENT',
        message: 'An error has occured',
        data: 'User not found'
      } );
    } else {
      const document = await user.getUserDocument();

      if ( !document ) {
        res.status( 404 ).json( {
          type: 'Error',
          code: 'UPDATE_DOCUMENT',
          message: 'An error has occured',
          data: 'Document not found'
        } );
      } else {
        await document.set( { finish_verification: true } ).save();

        res.json( {
          type: 'Success',
          code: 'UPDATE_DOCUMENT',
          message: `New document saved: ${ document.id }`,
        } );
      }
    }

  } catch (error) {
    res.status( 500 ).json( {
      type: 'Error',
      code: 'UPDATE_DOCUMENT',
      message: `An error has occured. ${ error.message }`,
      error: error
    } );
  }
};

exports.updateUserIdentitySynapsState = async ( req, res ) => {
  const { api_key } = req.params;

  if ( api_key !== process.env.UPDATE_KEY ) {
     return res.status( 404 ).json( {
      type: 'Error',
      code: 'UPDATE_SYNAPS_STATUS',
      message: `An error has occured`
    } );
  }

  try {
    const documents = await UserDocument.findAll();

    if ( !documents || documents.length === 0 ) {
      return res.json( {
        type: 'Success',
        code: 'UPDATE_SYNAPS_STATUS',
        message: 'All synaps status are updated'
      } );
    }

    documents.forEach( async (document) => {
      const synaps = await synapsApi.get( '/session/info', {
        headers: {
          'Api-Key': process.env.SYNAPS_API_KEY,
          'Session-Id': document.session_id
        }
      } );

      const { status } = synaps.data;
      document.synaps_status = status;
      await document.save();
    } );

    res.json( {
      type: 'Success',
      code: 'UPDATE_SYNAPS_STATUS',
      documents: documents.map( ( document ) => document.toJSON() )
    } );

  } catch (error) {
    return res.status( 500 ).json( {
      type: 'Error',
      code: 'UPDATE_SYNAPS_STATUS',
      message: `An error has occured`,
    } );
  }

};
