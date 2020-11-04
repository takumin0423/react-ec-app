import {createMuiTheme} from '@material-ui/core/styles';

// Pick colors on https://material.io/resources/color/#!/

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#aaba9f',
      main: '#a2aca2',
      dark: '#525a4e',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffc681',
      main: '#e5a13a',
      dark: '#8c7728',
      contrastText: '#000',
    }
  },
});