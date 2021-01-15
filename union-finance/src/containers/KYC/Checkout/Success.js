import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Check } from '@material-ui/icons';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';

import { TransactionPaper, CelebrateIcon } from './Success.styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    marginBottom: 50,
    paddingRight: 30,
    paddingLeft: 30,
  },
  box: {
    display: 'flex',
    borderRadius: '50%',
    backgroundColor: '#58CF81',
    padding: 5,
    marginRight: 20,
  },
  check: {
    color: theme.palette.common.white,
    width: '1.5em',
    height: '1.5em',
    [theme.breakpoints.only('xs')]: {
      width: '1.5em',
      height: '1.5em',
    },
  },
  thanks: {
    fontWeight: 600,
    [theme.breakpoints.only('sm')]: {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.25rem',
    },
  },
  welcomeText: {
    [theme.breakpoints.only('sm')]: {
      fontSize: '1.75rem',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.5rem',
    },
  },
  griditem: {
    display: 'flex',
    alignItems: 'center',
  },
  griditemcolumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionPurchaseLink: {
    marginTop: '1rem',
    color: '#BAB0FF',
  },
  transactionLockLink: {
    color: '#BAB0FF',
  },
  transactionLinkText: {
    color: '#BAB0FF',
    fontSize: '1.5rem',
    [theme.breakpoints.only('sm')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.only('xs')]: {
      fontSize: '1rem',
    },
  },
}));
//
const SuccessContainer = () => {
  //
  const history = useHistory();
  const { txLock, txPurchase, tokenAmount, timeLock } = useSelector(
    (state) => state.transactions,
  );

  if (txPurchase === '') {
    history.push('/kyc/checkout');
  }

  //
  const {
    container,
    box,
    check,
    thanks,
    griditem,
    griditemcolumn,
    welcomeText,
    transactionPurchaseLink,
    transactionLockLink,
    transactionLinkText,
  } = useStyles();

  const getLockDaysText = (days) => {
    if (days === 30) {
      return `UNN has been locked for <span>${days}</span> days for <span>25</span>% APY.`;
    } else if (days === 60) {
      return `UNN has been locked for ${days} days and at <span>30</span>% bonus APY.`;
    } else if (days === 120) {
      return `UNN has been locked for ${days} days and at <span>40</span>% bonus APY.`;
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={2}
      direction="column"
      className={container}
    >
      <Grid item className={griditem}>
        <Box component="span" className={box}>
          <Check color="primary" className={check} />
        </Box>
        <Typography
          className={thanks}
          color="textPrimary"
          component="div"
          variant="h3"
        >
          Thank you!
        </Typography>
      </Grid>
      <Grid item className={griditemcolumn}>
        <CelebrateIcon />
        <Typography
          color="textPrimary"
          align="justify"
          component="div"
          variant="h4"
          className={welcomeText}
        >
          Welcome to UNN DeFi Network!
        </Typography>
      </Grid>
      <Grid item>
        {txPurchase !== '' ? (
          <TransactionPaper>
            <p
              dangerouslySetInnerHTML={{
                __html: `Your received <span>${tokenAmount}</span> UNN + bonus <span>${
                  Math.round(((20 * tokenAmount) / 100) * 1000) / 1000
                }</span> one-year lock UNN.`,
              }}
            />
            {timeLock !== 0 ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: getLockDaysText(timeLock),
                }}
              />
            ) : null}
          </TransactionPaper>
        ) : null}
      </Grid>

      {txPurchase !== '' ? (
        <Grid item className={griditemcolumn}>
          <a
            href={`https://etherscan.io/tx/${txPurchase}`}
            className={transactionPurchaseLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              align="justify"
              component="div"
              variant="h5"
              className={transactionLinkText}
            >
              Purchase Transaction Details
            </Typography>
          </a>
        </Grid>
      ) : null}
      {txLock !== '' ? (
        <Grid item className={griditemcolumn}>
          <a
            href={`https://etherscan.io/tx/${txLock}`}
            className={transactionLockLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography
              align="justify"
              component="div"
              variant="h5"
              className={transactionLinkText}
            >
              Voluntary Lock Transaction Details
            </Typography>
          </a>
        </Grid>
      ) : null}
    </Grid>
  );
};

export { SuccessContainer };
