import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';

import { API_USERS_REGISTER } from '../../constants';

import { styles } from './styles';

function Register(props) {
  const { classes } = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

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
        <form
          className={classes.form}
          onSubmit={e => {
            e.preventDefault();
            fetch(API_USERS_REGISTER, {
              method: 'post',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                email,
                password,
                password2
              })
            })
              .then(data => data.json())
              .then(data => console.log('data', data))
              .catch(err => console.log('err', err));
          }}>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='email'>Name</InputLabel>
            <Input
              id='name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='email'>Email Address</InputLabel>
            <Input
              id='email'
              name='email'
              autoComplete='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <InputLabel htmlFor='password2'>Repeat password</InputLabel>
            <Input
              name='password2'
              type='password'
              id='password2'
              autoComplete='repeat-password'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
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
        <Divider />
        <FormControl fullWidth margin='normal'>
          <Button
            variant='contained'
            fullWidth
            className={classes.button}
            onClick={() => props.history.push('/login')}>
            Already have an account?
          </Button>
        </FormControl>
      </Paper>
    </main>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Register));
