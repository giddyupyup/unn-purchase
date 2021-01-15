import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
// import { CustomButton, SocialButton } from '../../components/Buttons';
// import { MemberInfo } from '../../components/Collapses';
// import { LinkedInIcon } from '../../components/Icons';
// import { CustomTextField } from '../../components/Inputs';
import { useTimeLeft } from '../../hooks';
import { Countdown } from '../Countdown';
// import { CardHolder } from '.';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'block',
  },
  headerTitle: {
    fontSize: '5.25rem',
    fontWeight: 200,
  },
  headerDesciption: {
    textAlign: 'center',
    fontSize: '2rem',
    fontWeight: 200,
    lineHeight: 1.4,
    width: 518,
    '& .MuiBox-root': {
      // fontStyle: 'italic',
      color: theme.palette.primary.main,
    },
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  afterSaleBtn: {
    padding: '6px 154px',
    [theme.breakpoints.down('xs')]: {
      padding: '6px 16px',
    },
  },
  download: {
    backgroundColor: '#FFF',
    padding: '3px 97px',
    [theme.breakpoints.down('xs')]: {
      padding: '3px 13px',
    },
  },
  description: {
    backgroundColor: theme.palette.primary.main,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 100,
    paddingRight: 40,
    marginTop: 70,
    marginBottom: 70,
    fontStyle: 'italic',
    '& .MuiTypography-root': {
      fontWeight: 200,
      lineHeight: 2,
    },
    '& .MuiBox-root': {
      fontWeight: 'bold',
    },
  },
  gridSpacing: {
    padding: theme.spacing(3),
  },
  subscribeInput: {
    '& .MuiInputBase-root': {
      borderRadius: 30,
    },
    '& input': {
      padding: '6px 20px',
      borderRadius: 30,
    },
  },
  linkedInSample: {
    marginLeft: 50,
    color: '#1B1B20',
    padding: 8,
    '& .MuiSvgIcon-root': {
      width: '0.8em',
      height: '0.8em',
    },
  },
  salesStarText: {
    marginTop: '3.5rem',
  },
}));

export default (props) => {
  const {
    headerContainer,
    headerTitle,
    headerDesciption,
    gridItem,
    // salesStarText,
    // afterSaleBtn,
    // download,
    // description,
    // gridSpacing,
    // subscribeInput,
    // linkedInSample,
  } = useStyles();

  const timeLeft = useTimeLeft('2020-12-03T14:00:00.000+00:00');
  if (!timeLeft) {
    return <Redirect to="/kyc" />;
  }

  return (
    <>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          spacing={3}
          direction="column"
          className={headerContainer}
        >
          <Grid item className={gridItem}>
            <Typography
              component="div"
              variant="h2"
              align="center"
              color="textPrimary"
              className={headerTitle}
            >
              Complete Finance
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: 30 }} className={gridItem}>
            <Typography
              component="div"
              variant="subtitle1"
              align="justify"
              color="textPrimary"
              className={headerDesciption}
            >
              <Box component="span">DeFi</Box> Protection Delivered
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: 30 }} className={gridItem}>
            <Grid container direction="column" justify="center">
              <Typography
                color="textPrimary"
                component="div"
                variant="h6"
                align="center"
              >
                Public token sale starts in
              </Typography>
              {/* <Typography
                className={salesStarText}
                color="textPrimary"
                component="div"
                variant="h2"
                align="center"
              >
                Sale starting soon!
              </Typography> */}
              <Countdown timeLeft={timeLeft} />
            </Grid>
          </Grid>
          {/* { false ? (
            <>
              <Grid item className={gridItem}>
                <CustomButton
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/precheck/kyc"
                >
                  Join the Sale-Pre Check
                </CustomButton>
              </Grid>
            </>
          ) : (
            <Grid item className={gridItem}>
              <CustomButton
                color="primary"
                variant="contained"
                className={afterSaleBtn}
                component={Link}
                to="/kyc"
              >
                Join the Sale
              </CustomButton>
            </Grid>
          ) }
          <Grid item className={ gridItem }>
            <CustomButton color="primary" variant="outlined" className={ download } href='https://unn.finance/wp-content/uploads/2020/10/UNION-Whitepaper-DRAFT.Oct_.2020.pdf' target='_blank' rel='noopener noreferrer'>Download WhitePaper</CustomButton>
          </Grid> */}
        </Grid>
      </Container>
      {/* <Container maxWidth={ false } style={{ padding: 0 }}>
        <Grid container className={ description }>
          <Typography component='div'>
            Decentralized Finance is forging a new industry, but that infrastructure is still being built. Today, DeFi is expensive and incohesive with dozens of government tokens,
            dozens of liquidity pools, and many steps required to develop yield farming strategies. Every single smart contract, every single stpe is an attach vector. The failure
            of one application leads to the failure of another. <Box component='span'>DeFi needs one shared ecosystem, with low fees, one governace token, built with each and every application in mind.</Box>
          </Typography>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <CardHolder />
      </Container>
      <Container maxWidth="lg">
        <Grid container justify="center" direction="column">
          <Grid item style={{ marginBottom: 30 }}>
            <Typography
              style={{ fontWeight: 100 }}
              color="textPrimary"
              component="div"
              variant="h4"
            >
              Founders
            </Typography>
          </Grid>
          <Grid item>
            <MemberInfo
              member={
                <Typography
                  component="div"
                  variant="h5"
                  color="primary"
                  style={{ fontWeight: 100, display: 'flex' }}
                >
                  <Box component="span" style={{ fontWeight: 700 }}>
                    Michael Beck
                  </Box>
                  , CEO
                  <SocialButton
                    className={linkedInSample}
                    color="primary"
                    startIcon={<LinkedInIcon />}
                    variant="contained"
                    fillcolor="#1B1B20"
                    svgwidth="0.8em"
                    svgheight="0.8em"
                    padding={8}
                  />
                </Typography>
              }
              memberinfo={
                <Typography
                  component="div"
                  variant="h6"
                  color="textPrimary"
                  align="justify"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              }
            />
            <MemberInfo
              member={
                <Typography
                  component="div"
                  variant="h5"
                  color="primary"
                  style={{ fontWeight: 100, display: 'flex' }}
                >
                  <Box component="span" style={{ fontWeight: 700 }}>
                    Jarrod Perry
                  </Box>
                  , COO
                </Typography>
              }
              memberinfo={
                <Typography
                  component="div"
                  variant="h6"
                  color="textPrimary"
                  align="justify"
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth={false}>
        <Grid
          container
          alignItems="center"
          style={{
            padding: 50,
            margin: 50,
            width: 'unset',
            backgroundColor: '#1B1B20',
          }}
        >
          <Grid item xs={12} lg={4} className={gridSpacing}>
            <CustomTextField
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              placeholder="your e-mail..."
              className={subscribeInput}
            />
          </Grid>
          <Grid item xs={12} lg={4} className={gridSpacing}>
            <CustomButton
              variant="contained"
              color="primary"
              style={{ fontSize: '1em', fontWeight: 100, padding: '8px 30px' }}
            >
              Subscribe
            </CustomButton>
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
};
