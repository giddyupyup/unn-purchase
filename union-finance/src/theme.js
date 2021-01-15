import { createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#7E6CFF',
    },
    secondary: {
      main: '#000',
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default THEME;
