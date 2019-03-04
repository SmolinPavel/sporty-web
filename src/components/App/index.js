import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from '../../theme/muiTheme';

import { AuthConsumer, AuthProvider } from '../../contexts';

import PrimarySearchAppBar from '../PrimarySearchAppBar';
import Map from '../Map';
import Login from '../Login';
import Register from '../Register';
import CreateFieldForm from '../CreateFieldForm';
import Profile from '../Profile';

import { ROUTES } from '../../constants';

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <Router>
      <AuthProvider>
        <AuthConsumer>
          {({ isAuth, login, logout, name }) => (
            <>
              <PrimarySearchAppBar
                isAuth={isAuth}
                logout={logout}
                name={name}
              />
              <Switch>
                <Route
                  path={ROUTES.LOGIN}
                  render={props => <Login {...props} login={login} />}
                />
                <Route
                  path={ROUTES.REGISTER}
                  render={props => <Register {...props} login={login} />}
                />
                <Route
                  path={ROUTES.CREATE_FIELD}
                  render={props => <CreateFieldForm {...props} />}
                />
                <Route
                  path={ROUTES.PROFILE}
                  render={props => <Profile {...props} />}
                />
                <Route
                  path={ROUTES.ROOT}
                  render={props => <Map {...props} showLoading />}
                />
              </Switch>
            </>
          )}
        </AuthConsumer>
      </AuthProvider>
    </Router>
  </MuiThemeProvider>
);

export default App;
