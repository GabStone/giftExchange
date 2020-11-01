import { createMuiTheme } from '@material-ui/core';
import typography from './typography';

/* eslint-disable import/no-unresolved, import/no-webpack-loader-syntax */
const vars = {
  primary: '#5383ff',
  primaryLight: '#495368',
  primaryDark: '#09142a',
  secondary: '#3d4977',
  inheritDefault1: '#fefefe',
  inheritDefault2: '#f8f9ff',
  second: '#070919',
  indigo: '#7420ff',
  purple: '#793de6',
  pink: '#fc26a4',
  red: '#f83245',
  orange: '#f4772e',
  yellow: '#ffc926',
  green: '#1bc943',
  teal: '#18e1a5',
  cyan: '#27dcf3'
};

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: vars.primary
    },
    grey: {
      300: vars.inheritDefault1,
      A100: vars.inheritDefault2
    },
    secondary: {
      main: vars.secondary
    },
    error: {
      main: vars.red
    },
    success: {
      main: vars.green
    },
    warning: {
      main: vars.orange
    },
    helpers: {
      primary: vars.blue,
      main: 'rgba(25, 46, 91, .035)'
    },
    contrastThreshold: 3,
    tonalOffset: 0.1
  },
  shape: {
    borderRadius: '0.5rem'
  },
  overrides: {
    MuiButton: {
      text: {
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      containedSizeSmall: {
        paddingLeft: '14px',
        paddingRight: '14px'
      },
      root: {
        textTransform: 'none',
        fontWeight: 'normal'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: vars.second,
        padding: '8px 16px',
        fontSize: '13px'
      },
      arrow: {
        color: vars.second
      }
    }
  },
  typography
});

export default MuiTheme;
