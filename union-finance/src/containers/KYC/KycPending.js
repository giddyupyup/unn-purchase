import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { SynapsClient } from '@synaps-io/synaps-client-sdk-js';
import { finishVerification } from '../../redux/actions';
import { Alert } from '../../components/Alerts';
import API from '../../services/API';

const useStyles = makeStyles((theme) => ({
  stepper: {
    marginBottom: 50,
  },
  containerMargin: {
    marginBottom: 40,
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
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
  const { description, stepper, containerMargin, alertAlignment } = useStyles();
  const { document, finish_verification, uuid } = useSelector(
    (state) => state.users,
  );
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState(ERROR_TEXT.default);
  const dispatch = useDispatch();

  const handleFinishVerification = useCallback(async () => {
    try {
      if (!document.finish_verification)
        await API.put('/users/document', { uuid });
      dispatch(finishVerification());
    } catch (error) {
      setErrorText(ERROR_TEXT.server);
      setError(true);
    }
  }, [document.finish_verification, uuid, dispatch]);

  useEffect(() => {
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
        if (!finish_verification) handleFinishVerification();
      });

      Synaps.on('close', () => {
        if (!finish_verification) {
          setErrorText(ERROR_TEXT.default);
          setError(true);
        }
      });
    }
  }, [
    dispatch,
    handleFinishVerification,
    document.session_id,
    finish_verification,
  ]);

  return (
    <Container maxWidth="md">
      {error ? (
        <Grid container className={containerMargin}>
          <Grid item xs>
            <Alert severity="error" addedClass={alertAlignment}>
              {errorText}
            </Alert>
          </Grid>
        </Grid>
      ) : null}
      {finish_verification ? (
        <Grid container justify="center" className={containerMargin}>
          <Grid container justify="center">
            <Grid
              item
              xs={8}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div>
                <Typography color="textPrimary" component="div" variant="body1">
                  Your KYC is being validated.
                  <br />
                  It can take from a few minutes to a few hours. Confirmation
                  and instructions for next step will be sent to your email once
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
        <Grid container justify="center">
          <Grid item xs={10} className={stepper}>
            <Typography
              className={description}
              color="textPrimary"
              align="center"
              component="div"
              variant="h4"
            >
              Documents & ID
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" className={containerMargin}>
              <Grid item xs={10}>
                <Typography color="textPrimary" variant="h6" align="center">
                  Action required: please supply required documents. Click on
                  "Last verifications" in KYC modal to review required
                  documents.
                </Typography>
              </Grid>
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
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
