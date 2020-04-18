import { createMuiTheme } from '@material-ui/core/styles';

const primary = '#fe6B8b';
const secondary = '#ff8e53';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: '#ff3553',
    },
    background: {
      default: '#1b1121',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 45,
      },
      containedPrimary: {
        background: `linear-gradient(45deg, ${primary} 50%, ${secondary} 90%)`,
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      containedSecondary: {
        background: `linear-gradient(45deg, ${secondary} 50%, ${primary} 90%)`,
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiCard: {
      root: {
        backgroundColor: '#342d45',
      },
    },
  },
});

export default theme;
