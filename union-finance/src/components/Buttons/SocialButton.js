import { Button, withStyles } from '@material-ui/core';

export default withStyles({
  root: {
    fontSize: '1.5rem',
    borderRadius: '50%',
    padding: '12px',
    flex: '0 0 auto',
    textAlign: 'center',
    minWidth: 'unset',
  },
  startIcon: {
    margin: 0,
  },
})(Button);
