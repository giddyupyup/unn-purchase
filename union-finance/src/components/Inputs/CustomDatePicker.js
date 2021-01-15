import { withStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

export default withStyles((theme) => ({
  root: {
    '& label': {
      fontSize: '22px',
      whiteSpace: 'nowrap',
      [theme.breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    '& label + .MuiInput-formControl': {
      marginTop: '24px',
    },
    '& .MuiInputBase-root': {
      '&::after, &::before': {
        content: 'none',
      },
    },
    '& input': {
      color: '#000',
      background: '#FFF',
      padding: '6px 10px 7px',
      height: '2em',
      borderRadius: 6,
    },
  },
}))(DatePicker);
