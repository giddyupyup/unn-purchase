import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { create, all } from 'mathjs';

import {
  setSaleCheckoutLockTx,
  setSaleCheckoutLockTime,
  setSaleCheckoutPurchaseTx,
  setSaleCheckoutUNNTokenAmount,
} from '../../../redux/actions';
import { Dialog } from '../../../components/Dialog';
import { Checkbox } from '../../../components/Checkbox';
import { Snackbar } from '../../../components/Snackbar';
import { CustomButton } from '../../../components/Buttons';
// import { CheckoutNotPermitted } from './CheckoutNotPermitted';
import { CheckoutNotWallet } from './CheckoutNotWallet';
import { formatNumber } from '../../../services/Utils';
import { getWeb3, getBN, toWei, fromWei } from '../../../services/Web3';
import {
  DAI_TOKEN_ABI,
  DAI_TOKEN_ADDRESS,
} from '../../../services/Contracts/DAIToken';
import {
  USDT_TOKEN_ABI,
  USDT_TOKEN_ADDRESS,
} from '../../../services/Contracts/USDTToken';
import {
  UNION_GOVERNANCE_TOKEN_ABI,
  UNION_GOVERNANCE_TOKEN_ADDRESS,
} from '../../../services/Contracts/UnionGovernanceToken';
import {
  UNION_PROTOCOL_TOKEN_SALE_ABI,
  UNION_PROTOCOL_TOKEN_SALE_ADDRESS,
} from '../../../services/Contracts/UnionProtocolTokenSale';
import {
  VOLUNTARY_LOCK_ABI,
  VOLUNTARY_LOCK_ADDRESS,
} from '../../../services/Contracts/VoluntaryLock';

import {
  Title,
  Header,
  Description,
  LeftWrapper,
  RightWrapper,
  PriceWrapper,
  PriceContent,
  MetamaskInfo,
  ButtonWrapper,
  CheckboxLabel,
  LoaderWrapper,
  LockListWrapper,
  SelectArrowIcon,
  TextFieldContent,
  TextFieldWrapper,
  SelectFormControl,
  TextFieldValidation,
  EstimatedTokensAmount,
  TransactionAlertStatus,
  StyledGrid as Grid,
  StyledPaper as Paper,
  StyledSelect as Select,
  StyledGridRow as GridRow,
  StyledMenuItem as MenuItem,
  StyledContainer as Container,
  StyledTextField as TextField,
  StyledFormControl as FormControl,
  StyledHeaderGridRow as HeaderGridRow,
  StyledCircularProgress as CircularProgress,
} from './Checkout.styles';

//
const CheckoutContainer = ({ address }) => {
  //
  const history = useHistory();
  const mathjs = create(all, {});
  const dispatch = useDispatch();

  const [ETHBalance, setETHBalance] = useState(0);
  const [DAIBalance, setDAIBalance] = useState(0);
  const [USDTBalance, setUSDTBalance] = useState(0);
  const [unnTokenAmount, setUnnTokenAmount] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [currentTokenNumber, setCurrentTokenNumber] = useState(0);
  const [approximateTokenPrice, setApproximateTokenPrice] = useState(0);

  //
  const [isValid, setIsValid] = useState(false);
  const [isBlured, setIsBlured] = useState(false);
  const [isETHAmountValid, setIsETHAmountValid] = useState(false);
  const [isDAIAmountValid, setIsDAIAmountValid] = useState(false);
  const [isUSDTAmountValid, setIsUSDTAmountValid] = useState(false);
  const [amountValue, setAmountValue] = useState('');
  const [lockTokensValue, setLockTokensValue] = useState(0);
  const [amountSelectValue, setAmountSelectValue] = useState('USDT');
  const [successLocked, setSuccessLocked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionLocked, setTransactionLocked] = useState(false);
  const [notPermittedAddress, setNotPermittedAddress] = useState(null);
  const [alert, setAlert] = useState({
    message: '',
    open: false,
    status: null,
  });
  const [transactionAlert, setTransactionAlert] = useState({
    message: '',
    open: false,
  });

  //
  const [web3, setWeb3] = useState(null);
  const [DAIContract, setDAIContract] = useState(null);
  const [USDTContract, setUSDTContract] = useState(null);
  const [voluntaryLockContract, setVoluntaryLockContract] = useState(null);
  const [governanceTokenContract, setGovernanceTokenContract] = useState(null);
  const [protocolTokenSaleContract, setProtocolTokenSaleContract] = useState(
    null,
  );

  //
  const amountSelectOptions = [
    { label: 'USDT', value: 'USDT' },
    { label: 'DAI', value: 'DAI' },
  ];

  const contractsInit = useCallback(async () => {
    const web3Instance = await getWeb3();
    const governanceTokenContract = new web3Instance.eth.Contract(
      UNION_GOVERNANCE_TOKEN_ABI,
      UNION_GOVERNANCE_TOKEN_ADDRESS,
    );
    const protocolTokenSaleContract = new web3Instance.eth.Contract(
      UNION_PROTOCOL_TOKEN_SALE_ABI,
      UNION_PROTOCOL_TOKEN_SALE_ADDRESS,
    );
    const voluntaryLockContract = new web3Instance.eth.Contract(
      VOLUNTARY_LOCK_ABI,
      VOLUNTARY_LOCK_ADDRESS,
    );

    const DAIContract = new web3Instance.eth.Contract(
      DAI_TOKEN_ABI,
      DAI_TOKEN_ADDRESS,
    );
    const USDTContract = new web3Instance.eth.Contract(
      USDT_TOKEN_ABI,
      USDT_TOKEN_ADDRESS,
    );

    setWeb3(web3Instance);
    setDAIContract(DAIContract);
    setUSDTContract(USDTContract);
    setVoluntaryLockContract(voluntaryLockContract);
    setGovernanceTokenContract(governanceTokenContract);
    setProtocolTokenSaleContract(protocolTokenSaleContract);
  }, []);

  useEffect(() => {
    contractsInit();
  }, [contractsInit]);

  //
  const getAddressPermittedApprovalStatus = useCallback(async () => {
    return protocolTokenSaleContract.methods
      .getAddressPermittedApprovalStatus(address)
      .call();
  }, [address, protocolTokenSaleContract]);

  const getTokenPrice = useCallback(
    async (currentTokenNumber) => {
      return protocolTokenSaleContract.methods
        .getTokenPrice(currentTokenNumber)
        .call();
    },
    [protocolTokenSaleContract],
  );

  const getCurrentTokenNumber = useCallback(async () => {
    return protocolTokenSaleContract.methods.getCurrentTokenNumber().call();
  }, [protocolTokenSaleContract]);

  const getBuyPriceInTether = async (symbol, amount) => {
    return protocolTokenSaleContract.methods
      .getBuyPriceInPermittedStablecoin(symbol, amount)
      .call();
  };

  const getBalanceOfETH = useCallback(async () => {
    return web3.eth.getBalance(address);
  }, [address, web3]);

  const getBalanceOfUSDT = useCallback(async () => {
    return USDTContract.methods.balanceOf(address).call();
  }, [USDTContract, address]);

  const getBalanceOfDAI = useCallback(async () => {
    return DAIContract.methods.balanceOf(address).call();
  }, [DAIContract, address]);

  // const getLockedBalanceOf = async (symbol, amount) => {
  //   return governanceTokenContract.methods.lockedBalanceOf(address).call();
  // };

  const getAllowanceOfUSDT = useCallback(async () => {
    return USDTContract.methods.allowance(address, UNION_PROTOCOL_TOKEN_SALE_ADDRESS).call();
  }, [USDTContract, UNION_PROTOCOL_TOKEN_SALE_ADDRESS, address]);

  const getAllowanceOfDAI = useCallback(async () => {
    return DAIContract.methods.allowance(address, UNION_PROTOCOL_TOKEN_SALE_ADDRESS).call();
  }, [DAIContract, UNION_PROTOCOL_TOKEN_SALE_ADDRESS, address]);

  const approveUSDTForSalesContract = async (amount) => {
    const amountValueFormatted = toWei(amount, 'mwei').toString();
    return USDTContract.methods
      .approve(UNION_PROTOCOL_TOKEN_SALE_ADDRESS, amountValueFormatted)
      .send({ from: address });
  };

  const approveDAIForSalesContract = async (amount) => {
    const amountValueFormatted = toWei(amount).toString();
    return DAIContract.methods
      .approve(UNION_PROTOCOL_TOKEN_SALE_ADDRESS, amountValueFormatted)
      .send({ from: address });
  };

  const approveUNNForVoluntryLock = async (amount) => {
    return governanceTokenContract.methods
      .increaseAllowance(VOLUNTARY_LOCK_ADDRESS, amount)
      .send({ from: address });
  };

  const purchaseTokens = async (symbol, amount) => {
    const amountValueFormatted = toWei(amount).toString();
    return protocolTokenSaleContract.methods
      .purchaseTokens(symbol, amountValueFormatted)
      .send({ from: address });
  };

  const lockTokens = async (amount, days) => {
    return voluntaryLockContract.methods
      .lockTokens(amount, days)
      .send({ from: address });
  };

  //
  const getETHBalance = useCallback(async () => {
    if (address) {
      return await getBalanceOfETH();
    }
  }, [address, getBalanceOfETH]);

  const getDAIBalance = useCallback(async () => {
    if (address) {
      return await getBalanceOfDAI();
    }
  }, [address, getBalanceOfDAI]);

  const getUSDTBalance = useCallback(async () => {
    if (address) {
      return await getBalanceOfUSDT();
    }
  }, [address, getBalanceOfUSDT]);

  const getTokensBalance = useCallback(async () => {
    const amountETHBalance = await getETHBalance();
    const amountDAIBalance = await getDAIBalance();
    const amountUSDTBalance = await getUSDTBalance();
    //
    setETHBalance(amountETHBalance);
    setUSDTBalance(amountUSDTBalance);
    setDAIBalance(amountDAIBalance);
    if (amountETHBalance > 0) {
      setIsETHAmountValid(true);
    }
  }, [getDAIBalance, getETHBalance, getUSDTBalance]);

  const getApprovalStatus = useCallback(async () => {
    if (address) {
      const approvalStatus = await getAddressPermittedApprovalStatus();
      setApprovalStatus(approvalStatus);
    }
  }, [address, getAddressPermittedApprovalStatus]);

  const getApproximateTokenPrice = useCallback(async () => {
    const newCurrentTokenNumber = await getCurrentTokenNumber();
    const approximateTokenPrice = await getTokenPrice(newCurrentTokenNumber);
    setCurrentTokenNumber(newCurrentTokenNumber);
    setApproximateTokenPrice(approximateTokenPrice);
    if (
      currentTokenNumber !== 0 &&
      currentTokenNumber !== newCurrentTokenNumber
    ) {
      return false;
    }
    return true;
  }, [getCurrentTokenNumber, getTokenPrice, currentTokenNumber]);

  const getUnnTokenAmount = (amount) => {
    return mathjs.floor(
      mathjs.evaluate(
        '(sqrt(86490003459600034596 * ' +
          currentTokenNumber +
          '^2 - 163680006819690072651600034596 * ' +
          currentTokenNumber +
          ' + 18600000372 *' +
          toWei(amount) +
          ' + 77440003355440037984222535460900008649) - 9300000186 * ' +
          currentTokenNumber +
          ' + 8800000190650000093)/9300000186',
      ),
    );
  };

  const onPurchase = async () => {
    setTransactionLocked(true);
    try {
      await getBuyPriceInTether(
        ethers.utils.formatBytes32String(amountSelectValue),
        unnTokenAmount,
      );
      showAlert('info', 'Grant permission to purchase.', 2000);
      showTransactionAlert('Step 1: Approving spend request.', 1000);
      if (amountSelectValue === 'USDT') {
        // checking
        const USDTAllowance = await getAllowanceOfUSDT();
        const amountValueFormatted = toWei(amountValue, 'mwei');
        if (getBN(amountValueFormatted).lte(getBN(USDTAllowance))) {
          // skip the approval
        } else if (getBN(USDTAllowance).gt(getBN(0)) && getBN(USDTAllowance).lt(getBN(amountValueFormatted))) {
          // ask user for approval transaction for 0 value
          showAlert('warning', 'Approve Reset Allowance.', 200);
          // after approval of 0 value, call approveUSDT
          await approveUSDTForSalesContract(0);
          await approveUSDTForSalesContract(amountValue);
        } else {
          await approveUSDTForSalesContract(amountValue);
        }
      } else if (amountSelectValue === 'DAI') {
        const DAIAllowance = await getAllowanceOfDAI();
        const amountValueFormatted = toWei(amountValue);

        if (getBN(amountValueFormatted).lte(getBN(DAIAllowance))) {
          // skip the approval
        } else if (getBN(DAIAllowance).gt(getBN(0)) && getBN(DAIAllowance).lt(getBN(amountValueFormatted))) {
          // ask user for approval transaction for 0 value
          showAlert('warning', 'Approve Reset Allowance', 200);
          // after approval of 0 value, call approveUSDT
          await approveDAIForSalesContract(0);
          await approveDAIForSalesContract(amountValue);
        } else {
          await approveDAIForSalesContract(amountValue);
        }
      }
      showAlert('info', 'Approve purchase of UNN.', 2000);
      showTransactionAlert('Step 2: Completing purchase transaction.', 1000);
      const purchaseTokensResponse = await purchaseTokens(
        ethers.utils.formatBytes32String(amountSelectValue),
        amountValue,
      );
      if (purchaseTokensResponse && purchaseTokensResponse.transactionHash) {
        dispatch(
          setSaleCheckoutPurchaseTx(purchaseTokensResponse.transactionHash),
        );
        if (
          purchaseTokensResponse.events &&
          purchaseTokensResponse.events.TokensPurchased &&
          purchaseTokensResponse.events.TokensPurchased.returnValues
        ) {
          dispatch(
            setSaleCheckoutUNNTokenAmount(
              purchaseTokensResponse.events.TokensPurchased.returnValues
                ._amount,
            ),
          );
        }
      }
      if (lockTokensValue !== 0) {
        showAlert('info', 'Grant permission to lock.', 2000);
        showTransactionAlert('Step 3: Approving spend request.', 1000);
        await approveUNNForVoluntryLock(toWei(unnTokenAmount));
        showAlert('info', 'Approve lock of UNN.', 2000);
        showTransactionAlert('Step 4: Completing lock transaction.', 1000);
        const lockTokensResponse = await lockTokens(
          toWei(unnTokenAmount),
          lockTokensValue,
        );
        if (lockTokensResponse && lockTokensResponse.transactionHash) {
          dispatch(setSaleCheckoutLockTime(lockTokensValue));
          dispatch(setSaleCheckoutLockTx(lockTokensResponse.transactionHash));
        }
      }
      showAlert(
        'success',
        'Checkout transaction has been completed. You will be redirected in 5 seconds.',
        1000,
      );
      setDefaultUIState();
      setSuccessLocked(true);
      closeTransactionAlert();
      setTimeout(() => {
        history.push('/kyc/checkout/success');
      }, 5000);
    } catch (error) {
      console.dir(error);
      setDefaultUIState();
      closeTransactionAlert();
      //
      if (
        error.message &&
        error.message.includes(
          'UPTS_ERROR: requested amount exceeds purchase limits',
        )
      ) {
        showAlert(
          'warning',
          'Requested amount exceeds purchase limits (87000). Transaction has been canceled.',
          500,
        );
      } else if (error.code === 4001) {
        showAlert('warning', 'Transaction has been canceled.', 500);
      } else {
        showAlert(
          'error',
          'Something went wrong, transaction has been canceled.',
          500,
        );
      }
    }
  };

  //
  const handleAmountChange = async (event) => {
    const { value } = event.target;
    const parsedValue = value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');

    const decimalPart = parsedValue.split('.').pop();
    setAmountValue(parsedValue);
    if (
      decimalPart.length < 19 &&
      Number(parsedValue) >= 100 &&
      Number(parsedValue) <= 87000
    ) {
      setIsValid(true);
      setUnnTokenAmount(getUnnTokenAmount(parsedValue));
    } else {
      setIsValid(false);
      setUnnTokenAmount(0);
    }

    //
    const ETHBalanceBN = getBN(ETHBalance);
    if (ETHBalanceBN.gt(getBN(0))) {
      setIsETHAmountValid(true);
    } else {
      setIsETHAmountValid(false);
    }

    if (value && amountSelectValue === 'DAI') {
      const DAIBalanceBN = getBN(DAIBalance);
      const valueBN = getBN(toWei(value));
      if (DAIBalanceBN.gte(valueBN)) {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(true);
      } else {
        setIsDAIAmountValid(false);
        setIsUSDTAmountValid(true);
      }
    }

    if (value && amountSelectValue === 'USDT') {
      const USDTBalanceBN = getBN(USDTBalance);
      const valueBN = getBN(toWei(value, 'mwei'));
      if (USDTBalanceBN.gte(valueBN)) {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(true);
      } else {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(false);
      }
    }
  };

  const handleAmoutSelectChange = (event) => {
    const { value } = event.target;
    setAmountSelectValue(value);

    //
    const ETHBalanceBN = getBN(ETHBalance);
    if (ETHBalanceBN.gt(getBN(0))) {
      setIsETHAmountValid(true);
    } else {
      setIsETHAmountValid(false);
    }

    if (amountValue && value === 'DAI') {
      const DAIBalanceBN = getBN(DAIBalance);
      const valueBN = getBN(toWei(amountValue));
      if (DAIBalanceBN.gte(valueBN)) {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(true);
      } else {
        setIsDAIAmountValid(false);
        setIsUSDTAmountValid(true);
      }
    }

    if (amountValue && value === 'USDT') {
      const USDTBalanceBN = getBN(USDTBalance);
      const valueBN = getBN(toWei(amountValue, 'mwei'));
      if (USDTBalanceBN.gte(valueBN)) {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(true);
      } else {
        setIsDAIAmountValid(true);
        setIsUSDTAmountValid(false);
      }
    }
  };

  const handleLockTokensChange = (event) => {
    const { value } = event.target;
    setLockTokensValue(Number(value));
  };

  const handleAmountBlur = (event) => {
    setIsBlured(true);
  };

  const handleAmountSelectBlur = (event) => {
    setIsBlured(true);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const setDefaultUIState = () => {
    setIsValid(false);
    setIsBlured(false);
    setIsETHAmountValid(false);
    setIsDAIAmountValid(false);
    setIsUSDTAmountValid(false);
    setTransactionLocked(false);
    setAmountValue('');
    setUnnTokenAmount(0);
    setLockTokensValue(0);
    setAmountSelectValue('USDT');
  };

  const showAlert = (status, message, time = 1000) => {
    handleSnackbarClose();
    setTimeout(() => {
      setAlert({
        message,
        status,
        open: true,
      });
    }, time);
  };

  const handleSnackbarClose = () => {
    setAlert((prevState) => ({
      message: '',
      open: false,
      status: prevState.status,
    }));
  };

  const showTransactionAlert = (message, time = 1000) => {
    setTimeout(() => {
      setTransactionAlert({
        message,
        open: true,
      });
    }, time);
  };

  const closeTransactionAlert = () => {
    setTransactionAlert({
      message: '',
      open: false,
    });
  };

  const handleSubmit = () => {
    onPurchase();
  };

  const returnValidationHelperText = () => {
    if (!isETHAmountValid && isBlured) {
      return 'Not enough ETH balance to contribute.';
    } else if (!isValid && isBlured) {
      return 'Order size must be at least $100 and no greater than $87,000.';
    } else if (amountSelectValue === 'DAI' && !isDAIAmountValid && isBlured) {
      return 'Contribution amount is higher than your DAI wallet balance.';
    } else if (amountSelectValue === 'USDT' && !isUSDTAmountValid && isBlured) {
      return 'Contribution amount is higher than your USDT wallet balance.';
    }
  };

  //
  useEffect(() => {
    if (!approvalStatus !== null && approvalStatus === false) {
      setTimeout(() => {
        setNotPermittedAddress(true);
      }, 2000);
    } else if (!approvalStatus !== null && approvalStatus === true) {
      setTimeout(() => {
        setNotPermittedAddress(false);
      }, 2000);
    }
  }, [approvalStatus]);

  useEffect(() => {
    if (notPermittedAddress !== null && notPermittedAddress === true) {
      handleDialogOpen();
    }
  }, [notPermittedAddress]);

  useEffect(() => {
    if (
      web3 &&
      voluntaryLockContract &&
      governanceTokenContract &&
      protocolTokenSaleContract
    ) {
      if (address) {
        getTokensBalance();
        getApprovalStatus();
      }
      getApproximateTokenPrice();
    }
  }, [
    address,
    getBalanceOfETH,
    getBalanceOfDAI,
    getBalanceOfUSDT,
    getTokenPrice,
    getApprovalStatus,
    getApproximateTokenPrice,
    web3,
    voluntaryLockContract,
    governanceTokenContract,
    protocolTokenSaleContract,
    getETHBalance,
    getDAIBalance,
    getUSDTBalance,
    getTokensBalance,
  ]);

  return (
    <>
      <Snackbar
        open={alert.open}
        status={alert.status}
        message={alert.message}
        handleClose={handleSnackbarClose}
      />

      <Dialog open={openDialog} onClose={handleDialogClose} />

      {address === null ? <CheckoutNotWallet /> : null}

      {/* {notPermittedAddress !== null && notPermittedAddress === true ? (
        <CheckoutNotPermitted />
      ) : null} */}

      <Container>
        {address !== null && notPermittedAddress === null ? (
          <>
            <HeaderGridRow container item justify="center">
              <Grid item xs={12} md={6}>
                <Header>Check Out</Header>
              </Grid>
            </HeaderGridRow>
            <GridRow container item justify="center">
              <Grid item xs={12} md={9}>
                <LoaderWrapper>
                  <CircularProgress size={64} />
                </LoaderWrapper>
              </Grid>
            </GridRow>
          </>
        ) : null}

        {/* {notPermittedAddress !== null && notPermittedAddress === false ? ( */}
        {notPermittedAddress !== null ? (
          <>
            <HeaderGridRow container item justify="center">
              <Grid item xs={12} md={6}>
                <Header>Check Out</Header>
              </Grid>
            </HeaderGridRow>
            <GridRow container item justify="center">
              <Grid item xs={12} md={9}>
                <Paper>
                  <Grid container item>
                    <Grid item xs={12} md={7}>
                      <LeftWrapper>
                        <Title>Contribution Amount (USDT/DAI)</Title>
                        <Description>
                          Please enter the amount of USDT/DAI you would like to
                          contribute in return for UNN. Order size must be at
                          least $100 and no greater than $87,000.
                        </Description>
                        <TextFieldWrapper>
                          <TextFieldContent
                            error={
                              isBlured &&
                              (!isValid ||
                                !isETHAmountValid ||
                                !isDAIAmountValid ||
                                !isUSDTAmountValid)
                            }
                          >
                            <TextField
                              variant="filled"
                              value={amountValue}
                              onBlur={handleAmountBlur}
                              onChange={handleAmountChange}
                              placeholder="Enter USDT/DAI Amount"
                            />
                            <SelectFormControl variant="outlined">
                              <Select
                                value={amountSelectValue}
                                onBlur={handleAmountSelectBlur}
                                onChange={handleAmoutSelectChange}
                                IconComponent={() => <SelectArrowIcon />}
                                MenuProps={{
                                  getContentAnchorEl: null,
                                  anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                  },
                                }}
                              >
                                {amountSelectOptions.map(({ label, value }) => (
                                  <MenuItem key={value} value={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </SelectFormControl>
                          </TextFieldContent>
                          <TextFieldValidation>
                            <span>{returnValidationHelperText()}</span>
                          </TextFieldValidation>
                        </TextFieldWrapper>
                        {unnTokenAmount ? (
                          <EstimatedTokensAmount>
                            Expected amount:{' '}
                            <span>{`${unnTokenAmount} UNN + ${
                              Math.round(((20 * unnTokenAmount) / 100) * 1000) /
                              1000
                            } bonus one-year lock UNN.`}</span>
                          </EstimatedTokensAmount>
                        ) : null}
                      </LeftWrapper>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <RightWrapper>
                        <Title>Pricing</Title>
                        <Description>
                          Approximate minimum price of UNN
                        </Description>
                        <PriceWrapper>
                          <PriceContent>
                            <span>
                              {formatNumber(fromWei(approximateTokenPrice), 4)}
                            </span>
                          </PriceContent>
                        </PriceWrapper>
                      </RightWrapper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </GridRow>

            <GridRow container item justify="center">
              <Grid item xs={12} md={9}>
                <Paper>
                  <Title>Voluntary Lock</Title>
                  <Description>
                    You can lock your UNN in return for yield boosts. <br />
                    The longer you lock, the more your returns. Your allocation
                    and yield tokens will be released at end of lock period.
                  </Description>
                  <Grid container item>
                    <Grid item xs={12} md={4}>
                      <LockListWrapper>
                        <FormControl>
                          <Checkbox
                            value={30}
                            checked={lockTokensValue === 30}
                            onChange={handleLockTokensChange}
                            label={
                              <CheckboxLabel>
                                <span>30 Days </span> &nbsp;25% APY
                              </CheckboxLabel>
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <Checkbox
                            value={60}
                            checked={lockTokensValue === 60}
                            onChange={handleLockTokensChange}
                            label={
                              <CheckboxLabel>
                                <span>60 Days </span> &nbsp;30% APY
                              </CheckboxLabel>
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <Checkbox
                            value={120}
                            checked={lockTokensValue === 120}
                            onChange={handleLockTokensChange}
                            label={
                              <CheckboxLabel>
                                <span>120 Days</span>40% APY
                              </CheckboxLabel>
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <Checkbox
                            value={null}
                            checked={lockTokensValue === 0}
                            onChange={handleLockTokensChange}
                            label={
                              <CheckboxLabel>
                                <span>No Lock</span>
                              </CheckboxLabel>
                            }
                          />
                        </FormControl>
                      </LockListWrapper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </GridRow>

            {transactionAlert.open ? (
              <GridRow container item justify="center">
                <TransactionAlertStatus>
                  <CircularProgress size={18} />
                  <span>{transactionAlert.message}</span>
                </TransactionAlertStatus>
              </GridRow>
            ) : null}

            <GridRow container item justify="center">
              <Grid item xs={12} md={6}>
                <ButtonWrapper>
                  {successLocked ? (
                    <CircularProgress size={48} />
                  ) : (
                    <CustomButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={
                        !address ||
                        !isValid ||
                        !isETHAmountValid ||
                        !isDAIAmountValid ||
                        !isUSDTAmountValid ||
                        transactionLocked ||
                        (notPermittedAddress !== null &&
                          notPermittedAddress === true)
                      }
                      onClick={handleSubmit}
                    >
                      Continue
                    </CustomButton>
                  )}
                </ButtonWrapper>

                <MetamaskInfo>
                  Please make sure you have installed MetaMask plug-in on your
                  browser.
                </MetamaskInfo>
              </Grid>
            </GridRow>
          </>
        ) : null}
      </Container>
    </>
  );
};

export { CheckoutContainer };
