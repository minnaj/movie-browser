import { createMuiTheme } from '@material-ui/core/styles';

const primary = '#FE6B8B';
const secondary = '#FF8E53';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    background: {
      default: '#1b1121',
      // paper: '#353342', // '#424242',
      // default: '#303030',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        background: `linear-gradient(45deg, ${primary} 30%, ${secondary} 90%)`,
        borderRadius: 3,
        border: 0,
        color: 'white',
        // height: 48,
        // padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#342d45',
        // background: `rgba(255, 255, 255, 0.2)`,
        //boxShadow: '0 3px 5px 2px rgba(52, 45, 69, 1)'// rgba(255, 255, 255, .12)',
      },
    },
  },
});

export default theme;
