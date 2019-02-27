import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from '../../theme/muiTheme';

import PrimarySearchAppBar from '../PrimarySearchAppBar';
import Loader from '../Loader';
import Map from '../Map';
import Login from '../Login';

import { getPosition } from '../../helpers';

import { API_GET_FIELDS, DEFAULT_LOCATION } from '../../constants';

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
    getCurrentLocation();
  }, ['center']);

  useEffect(() => {
    fetchFields();
  }, ['fields']);

  if (fields.length === 0) {
    return <Loader text='⛹🏻‍♂️ Loading...' />;
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <>
          <PrimarySearchAppBar />
          <Switch>
            <Route path='/login' component={Login} />
            <Route
              exact
              path='/'
              render={props => (
                <Map {...props} center={center} fields={fields} />
              )}
            />
          </Switch>
        </>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
