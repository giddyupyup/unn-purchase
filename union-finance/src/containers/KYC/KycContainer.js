import React from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import { KycStepper } from '../../components/Steppers';
import { useParams } from 'react-router-dom';
import {
  KycStep1,
  KycStep2,
  KycStep3,
  KycStep4,
  KycStep3Register,
} from './Steps';

const HEADER_DESCRIPTIONS = [
  'Personal Info',
  'Address',
  'Document & ID',
  'Funds & Purchase',
];

const STEPS_PRECHECK = [<KycStep1 />, <KycStep2 />, <KycStep3 />, <KycStep4 />];

const STEPS_REGISTER = [<KycStep1 />, <KycStep2 />, <KycStep3Register />];

const useStyles = makeStyles((theme) => ({
  stepper: {
    marginBottom: 50,
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

export default (props) => {
  const { steps, precheck } = props;
  const { id } = useParams();
  const { description, stepper } = useStyles();

  const stepsNode = precheck ? STEPS_PRECHECK : STEPS_REGISTER;

  return (
    <Container maxWidth="md">
      <Grid container justify="center">
        <Grid item xs={10} className={stepper}>
          <KycStepper numSteps={steps} active={+id - 1} />
          <Typography
            className={description}
            color="textPrimary"
            align="center"
            component="div"
            variant="h6"
          >
            {HEADER_DESCRIPTIONS[+id - 1]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {stepsNode[+id - 1]}
        </Grid>
      </Grid>
    </Container>
  );
};
