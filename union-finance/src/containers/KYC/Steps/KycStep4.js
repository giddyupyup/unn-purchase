import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CircularProgress,
  ClickAwayListener,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {
  CustomAutocomplete,
  CustomTextField,
} from '../../../components/Inputs';
import { CustomButton } from '../../../components/Buttons';
import { ArrowBackIos, Error } from '@material-ui/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { Alert } from '../../../components/Alerts';
import { CustomTooltip } from '../../../components/Tooltips';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserFund,
  updateUserInfo,
  precheckDone,
} from '../../../redux/actions';
import { SOURCE_OF_FUNDS } from '../../../services/Utils';
import { CustomModal } from '../../../components/Modal';
import API from '../../../services/API';
import MetamaskOnboarding from '@metamask/onboarding';
import { MetamaskIcon } from '../../../components/Icons';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 20,
    marginBottom: 20,
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
};

export default () => {
  const {
    buttons,
    griditem,
    metamaskBtn,
    metamaskIcon,
    metamaskBtnContainer,
    metamaskPaper,
  } = useStyles();
  const { fetching, precheck, uuid, eth_address, funds } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [openInfo, setOpenInfo] = useState(false);
  const [error, setError] = useState(false);
  const [errorTxt, setErrorTxt] = useState(ERROR_TEXT.default);
  const [submitting, setSumitting] = useState(false);
  const [metamaskTxt, setMetamaskTxt] = useState(ONBOARD_TEXT);
  const [ethereum, setEthereum] = useState(null);
  const metamaskOnboarding = useRef();

  const contribution = funds.contribution || '';
  const source = funds.source || null;
  const ethAddress = eth_address ?? '';

  const handleChangeContribution = useCallback(
    (e) => {
      const testContribution = /(^[.]?$|^\d+$|^(\d+?|[.]?)\d+$|^(\d+[.])$|^(\d+[.]\d+?)$)/;
      if (testContribution.test(e.target.value) || e.target.value === '') {
        dispatch(
          updateUserFund({
            ...funds,
            contribution: e.target.value,
          }),
        );
      }
    },
    [dispatch, funds],
  );

  const handleChangeSourceOfFunds = useCallback(
    (e, option) => {
      dispatch(
        updateUserFund({
          ...funds,
          source: option || '',
        }),
      );
    },
    [dispatch, funds],
  );

  const handleInfoClick = () => {
    setOpenInfo((prev) => !prev);
  };

  const handleTooltipClose = () => {
    setOpenInfo(false);
  };

  const handleMetamaskClick = async (e) => {
    e.preventDefault();

    if (MetamaskOnboarding.isMetaMaskInstalled()) {
      try {
        const permissions = await ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });

        if (!checkEthAccountsPermission(permissions)) {
          setErrorTxt(ERROR_TEXT.noMetamaskAccounts);
          setError(true);
          return;
        }

        const accounts = await ethereum.request({
          method: 'eth_accounts',
        });

        setError(false);
        dispatch(
          updateUserInfo({
            type: 'eth_address',
            value: accounts[0] || '',
          }),
        );
      } catch (error) {
        if (error.code === -32002) {
          setErrorTxt(ERROR_TEXT.waitingMetamask);
          setError(true);
        }
        if (error.code === 4001) {
          setErrorTxt(ERROR_TEXT.rejectMetamask);
          setError(true);
        }
      }
    } else {
      metamaskOnboarding.current.startOnboarding();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSumitting(true);
    if (!checkValidation()) {
      setError(false);
      try {
        const fund = await API.post('/users/fund', {
          uuid,
          contribution,
          source,
          eth_address: ethAddress,
        });
        console.log(fund.data);
        dispatch(precheckDone());
        history.push('/precheck/kyc/5');
      } catch (error) {
        setSumitting(false);
        setErrorTxt(ERROR_TEXT.serverError);
        setError(true);
      }
    } else {
      setSumitting(false);
      setErrorTxt(ERROR_TEXT.default);
      setError(true);
    }
  };

  const handleBackBtn = () => {
    history.push('/precheck/kyc/3');
  };

  const checkValidation = () => {
    return !contribution || !source || !ethAddress;
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
      if (eth_address) {
        metamaskOnboarding.current.stopOnboarding();
      } else {
        setMetamaskTxt(ONBOARD_TEXT);
      }
    }
  }, [eth_address]);

  useEffect(() => {
    if (MetamaskOnboarding.isMetaMaskInstalled()) {
      setEthereum(window.ethereum);
      setMetamaskTxt(CONNECT_TEXT);
    }
  }, []);

  let render = (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      {error ? (
        <Grid container>
          <Grid item xs className={griditem}>
            <Alert severity="error"> {errorTxt} </Alert>
          </Grid>
        </Grid>
      ) : null}
      {!fetching ? (
        <>
          <Grid container>
            <Grid item xs className={griditem}>
              <Grid container alignItems="center" style={{ marginBottom: -16 }}>
                <Typography
                  component="div"
                  variant="body1"
                  color="textPrimary"
                  align="center"
                >
                  Your contribution in USDT or DAI.
                </Typography>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <CustomTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    open={openInfo}
                    placement="right-start"
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    onClose={handleTooltipClose}
                    title={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textPrimary"
                      >
                        This is to allow us to plan for your indication of
                        interest. We may reach out to you regarding amounts over
                        a TBD limit. All contributions to the project will be
                        taken in USDT or DAI.
                      </Typography>
                    }
                  >
                    <IconButton color="primary" onClick={handleInfoClick}>
                      <Error />
                    </IconButton>
                  </CustomTooltip>
                </ClickAwayListener>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs className={griditem}>
              <CustomTextField
                type="text"
                value={contribution}
                onChange={handleChangeContribution}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">$</InputAdornment>
                  ),
                }}
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>
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
                        {ethAddress || 'Connect to your Metamask wallet'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} className={metamaskBtnContainer}>
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
          <Grid container justify="flex-end" className={buttons}>
            <CustomButton startIcon={<ArrowBackIos />} onClick={handleBackBtn}>
              Back
            </CustomButton>
            <CustomButton
              type="submit"
              color="primary"
              variant="contained"
              disabled={checkValidation()}
            >
              Next
            </CustomButton>
          </Grid>
        </>
      ) : null}
      <CustomModal open={fetching || submitting}>
        <CircularProgress />
      </CustomModal>
    </form>
  );

  if (!fetching && !uuid) {
    render = <Redirect to="/precheck/kyc/1" />;
  }

  if (precheck) {
    render = <Redirect to="/precheck/kyc/5" />;
  }

  return <>{render}</>;
};
