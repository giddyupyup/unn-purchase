import { Checkbox, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    '& .MuiIconButton-label': {
      backgroundColor: theme.palette.common.white,
      borderRadius: 5,
    },
  },
  checked: {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.common.white,
    },
    '& .MuiIconButton-label': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 5,
    },
  },
}))(Checkbox);
