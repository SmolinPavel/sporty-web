import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import FormLoadingIcon from '../FormLoadingIcon';

import { TOKEN_NAME_IN_STORE } from '../../constants';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import { loginApi } from '../../api/auth';

import { styles } from './styles';

const Login = ({ classes, history, login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi({
        email,
        password
      });

      const { token } = res;
      LocalStorageHelper.addItem(TOKEN_NAME_IN_STORE, token);
      login();
      history.push('/');
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <FormLoadingIcon
          loading={loading}
          defaultIcon={
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          }
        />

        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin='normal' required fullWidth error={!!error.email}>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {!!error.email && <FormHelperText>{error.email}</FormHelperText>}
          </FormControl>
          <FormControl
            margin='normal'
            required
            fullWidth
            error={!!error.password}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {!!error.password && (
              <FormHelperText>{error.password}</FormHelperText>
            )}
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Login
          </Button>
        </form>
        <FormControl fullWidth margin='normal'>
          <Button
            variant='contained'
            fullWidth
            className={classes.button}
            onClick={() => history.push('/register')}>
            Don't have an account yet?
          </Button>
        </FormControl>
      </Paper>
    </main>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles)(Login));
