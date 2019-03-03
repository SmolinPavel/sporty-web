import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from '../../theme/muiTheme';

import { AuthConsumer, AuthProvider } from '../../contexts';

import PrimarySearchAppBar from '../PrimarySearchAppBar';
import Loader from '../Loader';
import Map from '../Map';
import Login from '../Login';
import Register from '../Register';
import CreateFieldForm from '../CreateFieldForm';

import { getPosition } from '../../helpers';

import { API_GET_FIELDS, DEFAULT_LOCATION, ROUTES } from '../../constants';

const App = () => {
  const [center, setCenter] = useState(DEFAULT_LOCATION);
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    const response = await fetch(API_GET_FIELDS);
    const fields = await response.json();
    setFields(fields);
  }

  async function getCurrentLocation() {
    const position = await getPosition();
    const { coords: { latitude, longitude } = {} } = position;
    setCenter([latitude, longitude]);
  }

  useEffect(() => {
    fetchFields();
    getCurrentLocation();
  }, []);

  if (fields.length === 0) {
    return <Loader text='⛹🏻‍♂️ Loading...' />;
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <AuthProvider>
          <AuthConsumer>
            {({ isAuth, login, logout, name }) => (
              <>
                <PrimarySearchAppBar isAuth={isAuth} logout={logout} name={name} />
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
                    render={props => <CreateFieldForm {...props} center={center} fields={fields} />}
                  />
                  <Route
                    path={ROUTES.ROOT}
                    render={props => (
                      <Map {...props} center={center} fields={fields} />
                    )}
                  />
                </Switch>
              </>
            )}
          </AuthConsumer>
        </AuthProvider>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
