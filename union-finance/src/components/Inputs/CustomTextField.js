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
      backgroundColor: theme.palette.text.primary,
      borderRadius: 6,
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
    '& .MuiInputAdornment-root p': {
      color: '#999',
      fontSize: 20,
    },
  },
}))(TextField);
