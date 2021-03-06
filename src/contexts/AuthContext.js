import React, { createContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import LocalStorageHelper from '../helpers/LocalStorageHelper';
import { ROUTES, TOKEN_NAME_IN_STORE } from '../constants';

const AuthContext = createContext();

const { Consumer, Provider } = AuthContext;

const pureAuthProvider = ({ children, history }) => {
  const token = LocalStorageHelper.getItem(TOKEN_NAME_IN_STORE);
  const [isAuth, setIsAuth] = useState(
    !!token // TODO add expiration
  );
  const login = () => setIsAuth(true);
  const logout = () => {
    setIsAuth(false);
    LocalStorageHelper.removeItem(TOKEN_NAME_IN_STORE);
    history.push(ROUTES.LOGIN);
  };

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    // 🙈
  }

  const name = (decodedToken && decodedToken.name) || '';
  const userId = (decodedToken && decodedToken.id) || '';

  return (
    <Provider value={{ isAuth, login, logout, name, userId }}>{children}</Provider>
  );
};

const AuthProvider = withRouter(pureAuthProvider);
const AuthConsumer = Consumer;

export { AuthProvider, AuthConsumer };
