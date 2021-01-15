import React from 'react';

import { makeStyles, Paper, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#000',
    backgroundColor: '#F5F5F5',
    border: '3px solid #F5F5F5',
    '& .MuiTypography-root': {
      fontWeight: 400,
    },
    '&:hover': {
      cursor: 'pointer',
      borderColor: theme.palette.primary.main,
      '& > .MuiBox-root': {
        backgroundColor: 'rgb(126, 108, 255, 0.5)',
      },
      '& .MuiTypography-root': {
        fontWeight: 500,
      },
    },
  },
  box: {
    padding: '25px 0',
  },
}));

export default ({ type, typeInfo, selected, onClick, ...props }) => {
  const { paper, box } = useStyles();

  const container = clsx(paper, { selected: selected });

  return (
    <Paper className={container} onClick={() => onClick(type)}>
      <Box component="div" className={box}>
        <Typography align="center" component="div" variant="h6">
          {typeInfo}
        </Typography>
      </Box>
    </Paper>
  );
};
