import React from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ArrowBackIos, Error } from '@material-ui/icons';
import { CustomButton } from '../../../components/Buttons';

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

//
const CheckoutNotPermitted = () => {
  //
  const history = useHistory();

  const handleBackBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push('/kyc');
  };

  const { privacy } = useStyles();

  return (
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
            You were not approved for KYC.
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
            be sure to include the email you used to register with if you need
            further assistance.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export { CheckoutNotPermitted };
