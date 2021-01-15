import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { CustomAutocomplete, CustomTextField } from '../../components/Inputs';
import { CustomButton } from '../../components/Buttons';
import { Alert } from '../../components/Alerts';
import loading from '../../static/images/loading.gif';
import { CustomModal } from '../../components/Modal';
import { SOURCE_OF_FUNDS } from '../../services/Utils';
import { MetamaskIcon } from '../../components/Icons';
import MetamaskOnboarding from '@metamask/onboarding';
import API from '../../services/API';
import { ArrowBackIos, Error } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserState, updateUserDocumentInfo, updateUserEth, updateUserPersonalInfo } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: 20,
    marginBottom: 20,
  },
  itemWithDisplay: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  itemWithPosition: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
    marginBottom: 20,
  },
  register: {
    backgroundColor: '#FFF',
  },
  divider: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  dividerOr: {
    position: 'absolute',
    backgroundColor: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    height: 'calc( 100% + 35px )',
    fontWeight: 600,
  },
  griditem: {
    padding: theme.spacing(1),
  },
  metamaskBtn: {
    backgroundColor: theme.palette.common.white,
    fontSize: 18,
    padding: '3px 40px',
    [theme.breakpoints.down('xs')]: {
      padding: '3px 13px',
    },
  },
  metamaskIcon: {
    width: '2.5em',
    height: '2.5em',
    display: 'flex',
  },
  metamaskBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  metamaskPaper: {
    backgroundColor: '#2E2E3E',
    padding: '0px 20px 0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: 5,
    },
  },
  privacy: {
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect to Metamask';

const ERROR_TEXT = {
  default: 'Provide all the necessary and valid details.',
  waitingMetamask:
    'Permissions request already pending; please check Metamask plugin.',
  rejectMetamask: 'Metamask User rejected the request.',
  noMetamaskAccounts: 'No metamask account found',
  serverError: 'Something went wrong.',
  noUserFound: (
    <Box component="span">
      We couldn't find your wallet registered for this purchase event. Please
      re-enter your wallet, or click <Box component="strong">Register</Box>{' '}
      button below to continue as a new purchaser.
    </Box>
  ),
};

export default ({ status }) => {
  const {
    item,
    itemWithDisplay,
    itemWithPosition,
    register,
    divider,
    dividerOr,
    griditem,
    metamaskBtn,
    metamaskBtnContainer,
    metamaskIcon,
    metamaskPaper,
    privacy,
  } = useStyles();
  const { uuid, eth_address, document } = useSelector((state) => state.users);

  const [eth, setEth] = useState(eth_address);
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState(ERROR_TEXT.default);
  const [source, setSource] = useState(null);
  const [ethereum, setEthereum] = useState(null);
  const [metamaskTxt, setMetamaskTxt] = useState(ONBOARD_TEXT);
  const metamaskOnboarding = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const headerTxt =
    status === 'success' ? 'Thank you for Registering' : 'Before You Start...';

  const handleChangeSourceOfFunds = useCallback((e, option) => {
    setSource(option);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (status !== 'failed') {
      setOpen(true);
      if (!checkValidation()) {
        setError(false);
        try {

          if(document.synaps_status === 'VERIFIED') {
            if (status !== 'success') {
              await API.post('/users/fund', {
                uuid,
                contribution: 0,
                source,
                eth_address: eth,
              });
            }
            history.push('/kyc/checkout');
          } else if (document.synaps_status === 'REJECTED') {
            history.push('/kyc/register/failed');
          } else {
            history.push('/kyc/register/pending');
          }
        } catch (error) {
          setOpen(false);
          setErrorTxt(ERROR_TEXT.serverError);
          setError(true);
        }
      } else {
        setOpen(false);
        setErrorTxt(ERROR_TEXT.default);
        setError(true);
      }
    }
  };

  const handleBackBtn = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(resetUserState());
      history.push('/');
    },
    [dispatch, history],
  );

  const handleRegisterBtn = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.push('/kyc/register');
    },
    [history],
  );

  const handleMetamaskClick = async (e) => {
    e.preventDefault();
    setOpen(true);

    if (MetamaskOnboarding.isMetaMaskInstalled()) {
      try {
        const permissions = await ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });

        if (!checkEthAccountsPermission(permissions)) {
          setErrorTxt(ERROR_TEXT.noMetamaskAccounts);
          setError(true);
          setOpen(false);
          return;
        }

        const accounts = await ethereum.request({
          method: 'eth_accounts',
        });

        setError(false);
        setOpen(false);
        setEth(accounts[0] || '');
        dispatch(updateUserEth(accounts[0] || ''));
        checkUserByEthAddress(accounts[0] || '');
      } catch (error) {
        if (error.code === -32002) {
          setErrorTxt(ERROR_TEXT.waitingMetamask);
          setError(true);
          setOpen(false);
        }
        if (error.code === 4001) {
          setErrorTxt(ERROR_TEXT.rejectMetamask);
          setError(true);
          setOpen(false);
        }
      }
    } else {
      metamaskOnboarding.current.startOnboarding();
    }
  };

  const checkUserByEthAddress = async (eth_address) => {
    try {
      const response = await API.get(`/users/eth/${eth_address}`);

      const { synaps, user } = response.data;
      dispatch(updateUserDocumentInfo(synaps))
      dispatch(updateUserPersonalInfo(user));

      setError(false);
    } catch (error) {
      setErrorTxt(ERROR_TEXT.noUserFound);
      setError(true);
    }
  };

  const checkEthAccountsPermission = (permissions) => {
    const permissionNames = permissions.map((perm) => perm.parentCapability);
    return permissionNames.includes('eth_accounts');
  };

  useEffect(() => {
    if (!metamaskOnboarding.current) {
      metamaskOnboarding.current = new MetamaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetamaskOnboarding.isMetaMaskInstalled()) {
      if (eth) {
        metamaskOnboarding.current.stopOnboarding();
      } else {
        setMetamaskTxt(ONBOARD_TEXT);
      }
    }
  }, [eth]);

  useEffect(() => {
    if (MetamaskOnboarding.isMetaMaskInstalled()) {
      setEthereum(window.ethereum);
      setMetamaskTxt(CONNECT_TEXT);
    }
  }, []);

  useEffect(() => {
    window.document.title = 'Union Finance | Sale Registration';
  }, []);

  const checkValidation = () => {
    return !eth || !source || !!error;
  };

  let render = (
    <Container maxWidth="md">
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item xs={12} className={item}>
            <Typography
              component="div"
              variant="h4"
              color="textPrimary"
              align="center"
              style={{ marginBottom: 20 }}
            >
              {headerTxt}
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="textPrimary"
              align="center"
            >
              Please enter the wallet address you used to preregister.
            </Typography>
          </Grid>
          <Grid item xs={12} className={item}>
            <Grid container>
              <Grid item xs className={griditem}>
                <CustomAutocomplete
                  value={source}
                  onChange={handleChangeSourceOfFunds}
                  id="occupation"
                  options={SOURCE_OF_FUNDS}
                  autoHighlight
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      label="Source of Funds"
                      placeholder="Source of Funds"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs className={griditem}>
                <Typography component="div" variant="body1" color="textPrimary">
                  Ethereum address
                </Typography>
                <Grid item xs style={{ marginTop: 5 }}>
                  <Paper className={metamaskPaper}>
                    <Grid container alignItems="center">
                      <Grid
                        item
                        xs={12}
                        md={6}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <MetamaskIcon
                          className={metamaskIcon}
                          viewBox="0 0 318.6 318.6"
                        />
                        <Typography
                          component="div"
                          variant="body1"
                          color="textPrimary"
                          style={{
                            marginLeft: 10,
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                        >
                          {eth || 'Connect to your Metamask wallet'}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className={metamaskBtnContainer}
                      >
                        <CustomButton
                          color="primary"
                          variant="outlined"
                          className={metamaskBtn}
                          onClick={handleMetamaskClick}
                        >
                          {metamaskTxt}
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs className={griditem}>
                <Alert>
                  Please use a private wallet to receive your funds. Using an
                  exchange wallet may cause the loss of all the purchased tokens
                </Alert>
              </Grid>
            </Grid>
          </Grid>
          {error ? (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs className={griditem}>
                  <Alert severity="error"> {errorTxt} </Alert>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12} style={{ display: 'none' }}>
            <Alert severity="error">
              We are not able to connect to Metamask. Please make sure you have
              installed MetaMask plug-in on your browser.
            </Alert>
          </Grid>
          <Grid item xs={12} className={itemWithDisplay}>
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={checkValidation()}
            >
              Continue
            </CustomButton>
          </Grid>
          <Grid item xs={12} className={itemWithPosition}>
            <Divider className={divider} />
            <Typography
              className={dividerOr}
              component="div"
              variant="h5"
              color="textPrimary"
              align="center"
            >
              or
            </Typography>
          </Grid>
          <Grid item xs={12} className={itemWithDisplay}>
            <CustomButton
              color="primary"
              variant="outlined"
              onClick={handleRegisterBtn}
              className={register}
              disabled={ !error }
            >
              Register
            </CustomButton>
          </Grid>
        </Grid>
      </form>
      <CustomModal open={open}>
        <img src={loading} alt={loading} style={{ width: 30 }} />
        <Typography
          component="div"
          variant="body1"
          style={{ fontWeight: 600, lineHeight: 3 }}
        >
          Awaiting Metamask Connection
        </Typography>
      </CustomModal>
    </Container>
  );

  if (status === 'failed') {
    render = (
      <Container>
        <Grid container>
          <CustomButton startIcon={<ArrowBackIos />} onClick={handleBackBtn}>
            Back
          </CustomButton>
        </Grid>
        <Grid container justify="center" style={{ marginTop: 60 }}>
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <Error
              style={{
                width: '2em',
                height: '2em',
                fill: '#F8D7DA',
                marginRight: 20,
              }}
            />{' '}
            <Typography component="div" variant="h4" color="textPrimary">
              Please Contact Us{' '}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: 60 }}>
          <Grid item xs={8}>
            <Typography component="div" variant="body1" color="textPrimary">
              You were not allowed for KYC.
            </Typography>
            <Typography component="div" variant="body1" color="textPrimary">
              Please contact{' '}
              <Box
                class={privacy}
                component="a"
                href="mailto:info@unn.finance"
                target="_blank"
                rel="noopener noreferrer"
              >
                info@unn.finance
              </Box>{' '}
              and be sure to include the email you used to register with if you
              need further assistance.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return <>{render}</>;
};
