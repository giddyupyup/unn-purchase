import React, { useState } from 'react';
import { Grid, IconButton, Collapse, makeStyles } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  maincontainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  membercontainer: {
    backgroundColor: '#1B1B20',
    marginLeft: -60,
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
  },
  memberopen: {
    padding: 4,
    backgroundColor: '#2E2E3D',
  },
  membergrid: {
    padding: 4,
    marginLeft: 30,
    display: 'flex',
    alignItems: 'center',
  },
  memberinfogrid: {
    marginLeft: -4,
    paddingLeft: 15,
    backgroundColor: '#1B1B20',
    [theme.breakpoints.down('md')]: {
      marginLeft: 56,
    },
  },
  collapse: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

export default function ({ member, memberinfo, ...props }) {
  const {
    maincontainer,
    membercontainer,
    memberopen,
    membergrid,
    memberinfogrid,
    collapse,
  } = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Grid container direction="column" className={maincontainer}>
      <Grid item className={membercontainer}>
        <Grid container>
          <Grid item className={memberopen}>
            <IconButton onClick={handleOpen}>
              {open ? <Remove /> : <Add />}
            </IconButton>
          </Grid>
          <Grid item className={membergrid}>
            <Grid container direction="column">
              {member}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={memberinfogrid}>
        <Collapse
          in={open}
          timeout="auto"
          mountOnEnter
          unmountOnExit
          className={collapse}
        >
          {memberinfo}
        </Collapse>
      </Grid>
    </Grid>
  );
}
