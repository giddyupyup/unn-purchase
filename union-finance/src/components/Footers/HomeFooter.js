import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import { MailOutline, Telegram, Twitter } from '@material-ui/icons';
import { SocialButton } from '../Buttons';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  gridcontainer: {
    width: 'auto',
  },
  socials: {
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8);',
    },
    '& .MuiButton-label': {
      color: theme.palette.primary.main,
    },
  },
}));

export default (props) => {
  const { toolbar, gridcontainer, socials } = useStyles();
  return (
    <AppBar position="relative" component="footer">
      <Toolbar className={toolbar}>
        <Typography component="div" color="secondary">
          <SocialButton
            className={socials}
            startIcon={<MailOutline />}
            variant="outlined"
          ></SocialButton>{' '}
          info@unn.finance
        </Typography>
        <Grid container spacing={2} className={gridcontainer}>
          <Grid item xs>
            <SocialButton
              className={socials}
              startIcon={<Twitter />}
              variant="outlined"
              href="https://twitter.com/unnfinance"
              target="_blank"
              rel="noopener noreferrer"
            ></SocialButton>
          </Grid>
          <Grid item xs>
            <SocialButton
              className={socials}
              startIcon={<Telegram />}
              variant="outlined"
              href="https://telegram.org/UNNFinance"
              target="_blank"
              rel="noopener noreferrer"
            ></SocialButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
