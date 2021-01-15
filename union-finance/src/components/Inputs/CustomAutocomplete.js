import { withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default withStyles((theme) => ({
  input: {
    marginLeft: 7,
  },
  clearIndicator: {
    color: theme.palette.common.black,
  },
  popupIndicator: {
    color: theme.palette.common.black,
  },
}))(Autocomplete);
