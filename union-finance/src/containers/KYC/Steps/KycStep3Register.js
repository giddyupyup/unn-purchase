import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { SynapsClient } from '@synaps-io/synaps-client-sdk-js';
import { CustomButton } from '../../../components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import {
  finishVerification,
  generateSynapseSessionId,
} from '../../../redux/actions/users';
import { CustomModal } from '../../../components/Modal';
import { Alert } from '../../../components/Alerts';
import API from '../../../services/API';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
  },
  containerMargin: {
    marginBottom: 40,
  },
  alertAlignment: {
    justifyContent: 'center',
  },
}));

const ERROR_TEXT = {
  default:
    'Onboarding not completed. Please continue your verification process to proceed next step.',
  server: 'Problem in verification to the server.',
};

export default () => {
  const { buttons, containerMargin, alertAlignment } = useStyles();
  const {
    fetching,
    precheck,
    finish_verification,
    synaps,
    uuid,
    document,
  } = useSelector((state) => state.users);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(ERROR_TEXT.default);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push( '/' );
  };

  const handleBackBtn = () => {
    history.push('/kyc/register/2');
  };

  const handleFinishVerification = useCallback(async () => {
    try {
      await API.put('/users/document', { uuid });
      dispatch(finishVerification());
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErrorText(ERROR_TEXT.server);
      setError(true);
    }
  }, [dispatch, uuid]);

  useEffect(() => {
    if (uuid) {
      if (synaps) dispatch(generateSynapseSessionId(uuid));
      if (document.session_id) {
        const Synaps = new SynapsClient(document.session_id, 'workflow');
        Synaps.init({
          colors: {
            primary: '7E6CFF',
            secondary: 'FFFFFF',
          },
        });
        Synaps.on('finish', () => {
          setError(false);
          setSubmitting(true);
          if (!finish_verification) handleFinishVerification();
        });

        Synaps.on('close', () => {
          if (!finish_verification) {
            setErrorText(ERROR_TEXT.default);
            setError(true);
          }
        });
      }
    }
  }, [
    dispatch,
    handleFinishVerification,
    document.session_id,
    synaps,
    uuid,
    finish_verification,
  ]);

  const verificationNode = finish_verification ? (
    <Grid container justify="center" className={containerMargin}>
      {/* <Grid container justify="center" className={containerMargin}>
        <CircularProgress />
      </Grid> */}
      <Grid container justify="center">
        <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <Typography color="textPrimary" component="div" variant="body1">
              Your KYC is being validated.
              <br />
              It can take from a few minutes to a few hours. Confirmation and
              instructions for next step will be sent to your email once
              completed.
              <br />
              <br />
              Note:
              <br />
              Please check your spam/junk folder for emails from unn.finance.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <>
      <Grid container justify="center" className={containerMargin}>
        <Typography color="textPrimary" variant="h5">
          Please Verify your Identity
        </Typography>
      </Grid>
      <Grid container justify="center" className={containerMargin}>
        <button
          id="synaps-btn"
          className="synaps-verify-btn-white"
          type="button"
        >
          Verify with Synaps
        </button>
      </Grid>
    </>
  );

  let render = (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {error ? (
        <Grid container className={containerMargin}>
          <Grid item xs>
            <Alert severity="error" addedClass={alertAlignment}>
              {errorText}
            </Alert>
          </Grid>
        </Grid>
      ) : null}
      {!synaps ? (
        <>
          {verificationNode}
          <Grid container justify="flex-end" className={buttons}>
            <CustomButton startIcon={<ArrowBackIos />} onClick={handleBackBtn}>
              Back
            </CustomButton>
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={!finish_verification}
            >
              Finish
            </CustomButton>
          </Grid>
        </>
      ) : null}
      <CustomModal open={synaps || submitting}>
        <CircularProgress />
      </CustomModal>
    </form>
  );

  if (!fetching && !uuid) {
    render = <Redirect to="/" />;
  }

  if (precheck) {
    render = <Redirect to="/precheck/kyc/5" />;
  }

  return <>{render}</>;
};
