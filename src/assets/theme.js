import {createMuiTheme} from '@material-ui/core/styles';

// Pick colors on https://material.io/resources/color/#!/

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#b6ff88',
      main: '#47cb42',
      dark: '#2b880a',
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