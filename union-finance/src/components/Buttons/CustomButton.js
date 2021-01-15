import { Button, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    padding: '6px 90px',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRadius: '30px',
    textTransform: 'none',
    borderWidth: 3,
    '&:hover': {
      borderWidth: 3,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      padding: '6px 30px',
    },
  },
  outlined: {
    padding: '3px 87px',
    [theme.breakpoints.down('sm')]: {
      padding: '3px 27px',
    },
    '&.Mui-disabled': {
      color: '#000C'
    }
  }
}))(Button);
