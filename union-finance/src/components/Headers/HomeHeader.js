import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
} from '@material-ui/core';
import { Twitter, Telegram } from '@material-ui/icons';
import { LogoIcon, MetamaskIcon } from '../Icons';
import { SocialButton } from '../Buttons';
import { shortenAddress } from '../../services/Utils';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: '#000',
    marginTop: 50,
  },
  logoicon: {
    width: 249,
    height: 68,
    [theme.breakpoints.down('xs')]: {
      width: 150,
      height: 68,
    },
  },
  ethAddress: {
    display: 'inline-block',
    marginLeft: '10px',
    fontFamily: "'Open Sans', sans-serif",
  },
  iconbtn: {
    borderRadius: 4,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  gridcontainer: {
    width: 'auto',
  },
  metamaskBtn: {
    padding: 8,
  },
  metamaskIcon: {
    width: '2em',
    height: '2em',
  },
}));

export default ({ home, checkout, address, getAccount, ...props }) => {
  const {
    appbar,
    toolbar,
    iconbtn,
    logoicon,
    ethAddress,
    gridcontainer,
    metamaskBtn,
    metamaskIcon,
  } = useStyles();
  return (
    <AppBar className={appbar} position="relative">
      <Toolbar className={toolbar}>
        <IconButton
          className={iconbtn}
          edge="start"
          color="inherit"
          href="https://www.unn.finance"
          rel="noopener noreferrer"
        >
          <LogoIcon className={logoicon} viewBox="0 0 249 68" />
        </IconButton>
        {home ? (
          <Grid container spacing={2} className={gridcontainer}>
            <Grid item xs>
              <SocialButton
                startIcon={<Twitter />}
                variant="contained"
                href="https://twitter.com/unnfinance"
                target="_blank"
                rel="noopener noreferrer"
              ></SocialButton>
            </Grid>
            <Grid item xs>
              <SocialButton
                startIcon={<Telegram />}
                variant="contained"
                href="https://telegram.org/UNNFinance"
                target="_blank"
                rel="noopener noreferrer"
              ></SocialButton>
            </Grid>
          </Grid>
        ) : null}
        {checkout ? (
          <Grid container spacing={2} className={gridcontainer}>
            <Grid item xs>
              <SocialButton
                className={metamaskBtn}
                startIcon={
                  <MetamaskIcon
                    className={metamaskIcon}
                    viewBox="0 0 318.6 318.6"
                  />
                }
                variant="contained"
                onClick={getAccount}
              ></SocialButton>
              <span className={ethAddress}>
                {address && shortenAddress(address)}
              </span>
            </Grid>
          </Grid>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
