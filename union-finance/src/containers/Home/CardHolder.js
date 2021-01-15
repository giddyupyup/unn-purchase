import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import sampleImage from '../../static/images/sample.jpg';
import { InfoCard } from '../../components/Cards';

const useStyles = makeStyles({
  header: {
    fontSize: '5.25rem',
    fontWeight: 200,
  },
  cardItem: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiCard-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-root': {
      fontWeight: 200,
      lineHeight: 2,
      fontStyle: 'italic',
      textAlign: 'center',
    },
  },
  cardHolder: {
    marginTop: 100,
    marginBottom: 50,
  },
});

export default (props) => {
  const { header, cardItem, cardHolder } = useStyles();

  const cards = [
    'UNION is a state-channel infrastructure on Ethereum specifically designed for DeFi and tailored to scale.',
    'Users only pay gas costs on Ethereum upon entering the DeFi ecosystem and can rebalance withtin DeFi with relative ease and no cost.',
    'To ensure trust, UNION integrate an insurance protocol to provide contract coverage for the entire state channel.',
  ];
  return (
    <Grid container justify="center" spacing={5} direction="column">
      <Grid item>
        <Typography
          component="div"
          variant="h2"
          align="center"
          color="textPrimary"
          className={header}
        >
          What is UNION?
        </Typography>
      </Grid>
      <Grid item className={cardHolder}>
        <Grid container justify="center" spacing={7}>
          {cards.map((card, id) => (
            <Grid key={id} item xs={12} md={4} lg={4} className={cardItem}>
              <InfoCard
                image={sampleImage}
                content={<Typography>{card}</Typography>}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
