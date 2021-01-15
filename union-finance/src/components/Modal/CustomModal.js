import { Dialog, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    '& .MuiBackdrop-root': {
      backgroundColor: theme.palette.action.disabled,
    },
  },
  paper: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
}))(Dialog);
