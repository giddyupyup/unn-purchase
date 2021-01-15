import { TextField, withStyles } from '@material-ui/core';

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
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-root': {
      color: '#000',
      background: '#FFF',
      padding: '6px 5px 7px',
      height: '2.8em',
      borderRadius: 6,
      '&::after, &::before': {
        content: 'none',
      },
    },
    '& .MuiSelect-icon': {
      top: 'calc(50% - 18px)',
      width: '1.5em',
      height: '1.5em',
      color: '#000',
    },
  },
}))(TextField);
