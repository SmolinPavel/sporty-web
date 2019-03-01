import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { TOKEN_NAME_IN_STORE } from '../../constants';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import { registerApi } from '../../api/auth';

import { styles } from './styles';

const Register = ({ classes, history, login }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await registerApi({
        name,
        email,
        password,
        password2
      });

      const { token } = res;
      LocalStorageHelper.addItem(TOKEN_NAME_IN_STORE, token);
      login();
      history.push('/');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin='normal' error={!!error.name} required fullWidth>
            <InputLabel htmlFor='email'>Name</InputLabel>
            <Input
              id='name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {!!error.name && <FormHelperText>{error.name}</FormHelperText>}
          </FormControl>
          <FormControl margin='normal' error={!!error.email} required fullWidth>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {!!error.email && <FormHelperText>{error.email}</FormHelperText>}
          </FormControl>
          <FormControl
            margin='normal'
            error={!!error.password}
            required
            fullWidth>
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
          <FormControl
            margin='normal'
            error={!!error.password2}
            required
            fullWidth>
            <InputLabel htmlFor='password2'>Confirm Password</InputLabel>
            <Input
              name='password2'
              type='password'
              id='password2'
              autoComplete='confirm-password'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            {!!error.password2 && (
              <FormHelperText>{error.password2}</FormHelperText>
            )}
          </FormControl>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Register
          </Button>
        </form>
        <FormControl fullWidth margin='normal'>
          <Button
            variant='contained'
            fullWidth
            className={classes.button}
            onClick={() => history.push('/login')}>
            Already have an account?
          </Button>
        </FormControl>
      </Paper>
    </main>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Register));
