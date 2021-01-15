import { Tooltip, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  tooltip: {
    padding: 15,
    backgroundColor: theme.palette.grey[800],
  },
}))(Tooltip);
