import React from 'react';
import {
  withStyles,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from '@material-ui/core';

const CustomStepper = withStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
  },
}))(Stepper);

const CustomStepLabel = withStyles((theme) => ({
  iconContainer: {
    padding: 0,
    '& .MuiStepIcon-root': {
      fontWeight: 'bold',
      borderRadius: '50%',
      color: theme.palette.text.primary,
      '& .MuiStepIcon-text': {
        fill: '#000',
      },
      '&.MuiStepIcon-active': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.text.primary,
        '& .MuiStepIcon-text': {
          fill: theme.palette.text.primary,
        },
      },
      '&.MuiStepIcon-completed': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.text.primary,
        '& .MuiStepIcon-text': {
          fill: theme.palette.text.primary,
        },
      },
    },
  },
  labelContainer: {
    display: 'none',
  },
}))(StepLabel);

const CustomConnector = withStyles((theme) => ({
  active: {
    '& $line': {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    '& $line': {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.text.primary,
    borderTopWidth: 3,
    borderRadius: 2,
  },
}))(StepConnector);

export default ({ numSteps, active, ...props }) => {
  let steps = [];
  for (let i = 0; i < numSteps; i++) {
    steps.push(i);
  }
  return (
    <CustomStepper activeStep={active}>
      {steps.map((step) => (
        <Step key={step} connector={<CustomConnector />}>
          <CustomStepLabel />
        </Step>
      ))}
    </CustomStepper>
  );
};
