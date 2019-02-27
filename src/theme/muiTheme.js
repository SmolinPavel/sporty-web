import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: '#b2ebf2',
      main: '#009be5',
      dark: '#006db3',
      contrastText: '#fff'
    }
  },
  userAgent: 'all'
});

export default theme;
