const { UserDocument, Synap, UserIdentity, User } = require( '../models' );
const { synapsApi } = require('../utils/third_party_api');
const saleContractService = require("../utils/contracts/SaleContractService")

// TODO: refactor this
const sendmail = require('sendmail')({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false,
  devPort: 25, // Default: False
  devHost: 'localhost', // Default: localhost
  smtpPort: 25, // Default: 25
  smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
});
const { UnnSendmail } = require('../utils/unn-sendmail');

exports.syncSynaps = async ( req, res ) => {
  const {
    session_id
  } = req.body;
  try {
    if(req.query.secret !== process.env.SYNAPS_SECRET) {
      throw new Error("Invalid secret provided");
    }

    const document = await UserDocument.findOne( { where: { session_id } } );
    const userIdentity = await UserIdentity.findOne({ where: { user_id: document.user_id } });
    const user = await User.findOne({ where: { id: document.user_id } });

    if ( !document ) {
      return res.status( 404 ).json( { message: 'Synaps session not found'} );
    }

    const synaps = await synapsApi.get( '/session/info', {
      headers: {
        'Api-Key': process.env.SYNAPS_API_KEY,
        'Session-Id': document.session_id
      }
    } );

    const { status } = synaps.data;

    const { data: progress } = await synapsApi.get( '/workflow/progress', {
      headers: {
        'Session-Id': document.session_id
      }
    } );

    const synapsDb = await Synap.findAll( { where: { session_id } } );

    let synapStatus = status;

    if ( status === 'VERIFIED' ) {
      let rejectedStatus = false;

        progress.forEach( async doc => {
          const synap = synapsDb.find( s => s.step === doc.step );

          if( doc.state === "REJECTED" ) rejectedStatus = true;

          await synap.update( { state: doc.state } );

        } );

        if ( rejectedStatus ) {
          synapStatus = "REJECTED";
          sendmail(UnnSendmail.getKYCRejectedTemplate(user.email),
          function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
          });
        } else {
          const userName = `${userIdentity.first_name} ${userIdentity.last_name}`;
          const currentStatus = await saleContractService.getAddressPermittedApprovalStatus(user.eth_address)
          if(!currentStatus){
            saleContractService.addToPermittedList(user.eth_address, true, false, 2500000, await saleContractService.getNonce())
          }
          sendmail(UnnSendmail.getKYCApprovedTemplate(user.email, userName),
              function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
              });
        }
    }

    if ( status === 'PENDING' ) {

      if ( !synapsDb.length ) {
        progress.forEach( async doc => {
          await Synap.create( {
            user_id: document.user_id,
            session_id,
            state: doc.state,
            step: doc.step
          } );
        } )
      } else {
        // Check for doc that was updated
        let actionRequired = false;

        progress.forEach( async doc => {
          const synap = synapsDb.find( s => s.step === doc.step );

          if ( synap.state !== doc.state ) {
            if ( synap.state === 'PENDING' && doc.state === 'NOT_STARTED' ) actionRequired = true;
          }

          await synap.update( { state: doc.state } );

        } );

        if ( actionRequired ) {
          sendmail(UnnSendmail.getKYCActionRequiredTemplate(user.email),
              function(err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
              });
          // http://verify.synaps.io/?session_id={{session_id}}&service=workflow
        }
      }
    }

    await document.set( { synaps_status: synapStatus } ).save();
    res.json( { message: 'success', synaps_status: synapStatus } );
  } catch (error) {
    console.log( error );
    res.status( 500 ).json( { message: 'error in saving synaps'} );
  }
};

exports.getSynapsStatus = async ( req, res ) => {
  const { session } = req.params;

  try {
    const document = await UserDocument.findOne( { where: { session_id: session } } );

    if ( !document || !document.synaps_status ) {
      return res.status( 404 ).json( { message: 'Synaps status not found, or still incomplete' } );
    }

    res.json( {
      message: 'Synaps status found',
      data: document.toJSON()
    } );
  } catch (error) {
    console.log( error );
    res.status( 500 ).json( { message: 'error in synaps status'} );
  }
};
