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
import TextField from '@material-ui/core/TextField';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Map from '../Map';
import FormLoadingIcon from '../FormLoadingIcon';

import { createFieldApi } from '../../api/fields';

import { styles } from './styles';

const Profile = ({ center, classes, history }) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [phones, setPhones] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleMapTap = ({ latlng }) => {
    setLat(latlng.lat);
    setLng(latlng.lng);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   await createFieldApi({
    //     address,
    //     lat,
    //     long: lng,
    //     description
    //   });

    //   history.push('/');
    // } catch (err) {
    //   setLoading(false);
    //   setError(err);
    // }
  };

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <FormLoadingIcon
          loading={loading}
          defaultIcon={
            <Avatar className={classes.avatar}>
              <FaceIcon />
            </Avatar>
          }
        />

        <Typography component='h1' variant='h5'>
          User Profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl
            margin='normal'
            required
            fullWidth
            error={!!error.address}>
            <InputLabel htmlFor='address'>Your Address</InputLabel>
            <Input
              name='address'
              type='text'
              id='address'
              autoComplete='field-address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            {!!error.address && (
              <FormHelperText>{error.address}</FormHelperText>
            )}
          </FormControl>
          <FormControl margin='normal' required fullWidth>
            <TextField
              id='outlined-textarea'
              label='A Few Words About Yourself'
              placeholder='About Yourself'
              multiline
              margin='normal'
              variant='outlined'
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
          </FormControl>
          {lat && lng ? (
            <div className={classes.container}>
              <FormControl
                margin='normal'
                fullWidth
                style={{ flexDirection: 'row' }}>
                <TextField
                  id='outlined-lat-input'
                  label='Lat'
                  type='text'
                  autoComplete='lat'
                  margin='normal'
                  variant='outlined'
                  value={lng}
                />
                <TextField
                  id='outlined-long-input'
                  label='Long'
                  type='text'
                  autoComplete='long'
                  margin='normal'
                  variant='outlined'
                  value={lat}
                />
              </FormControl>
            </div>
          ) : (
            <InputLabel>
              Tap on the map to set your location ⬇<br />
              Use zoom 🗺 to achive the best accuracy
            </InputLabel>
          )}
          <FormControl margin='normal' required fullWidth>
            <Map
              height='300px'
              onClick={handleMapTap}
            />
          </FormControl>
          <FormControl margin='normal' fullWidth error={!!error.url}>
            <InputLabel htmlFor='url'>Url</InputLabel>
            <Input
              id='url'
              name='url'
              type='text'
              autoComplete='url'
              autoFocus
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            {!!error.url && <FormHelperText>{error.url}</FormHelperText>}
          </FormControl>

          <FormControl margin='normal' fullWidth error={!!error.phones}>
            <InputLabel htmlFor='phones'>Phones</InputLabel>
            <Input
              id='phones'
              name='phones'
              type='text'
              autoComplete='phones'
              autoFocus
              value={phones}
              onChange={e => setPhones(e.target.value)}
            />
            {!!error.url ? (<FormHelperText>{error.url}</FormHelperText>) : (
              <FormHelperText>Use comma to separate multiple phones like: +375234, +8123423</FormHelperText>
            )}
          </FormControl>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Update Profile
          </Button>
        </form>
      </Paper>
    </main>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  center: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired
};

export default withRouter(withStyles(styles)(Profile));
