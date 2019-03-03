import React from 'react';
import { withRouter } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AboutIcon from '@material-ui/icons/ImportContacts';
import LockIcon from '@material-ui/icons/Lock';
import RegisterIcon from '@material-ui/icons/PregnantWoman';
import ContactIcon from '@material-ui/icons/ContactPhone';
import DonateIcon from '@material-ui/icons/Redeem';
import LanguageIcon from '@material-ui/icons/Language';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import RoomIcon from '@material-ui/icons/Room';

import { ROUTES } from '../../constants';

const Drawer = ({ history, isOpen, onClick }) => {
  const handleUrl = url => {
    onClick();
    history.push(url);
  };

  return (
    <SwipeableDrawer open={isOpen} onClose={onClick} onOpen={onClick}>
      <div
        tabIndex={0}
        role='button'
        onClick={() => console.log('onClick')}
        onKeyDown={() => console.log('onKeyDown')}>
        <List>
          <ListItem button key='login' onClick={() => handleUrl(ROUTES.LOGIN)}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary='Login' />
          </ListItem>
          <ListItem
            button
            key='register'
            onClick={() => handleUrl(ROUTES.REGISTER)}>
            <ListItemIcon>
              <RegisterIcon />
            </ListItemIcon>
            <ListItemText primary='Register' />
          </ListItem>
          <ListItem
            button
            key='fields-map'
            onClick={() => handleUrl(ROUTES.ROOT)}>
            <ListItemIcon>
              <RoomIcon />
            </ListItemIcon>
            <ListItemText primary='Fields Map' />
          </ListItem>
          <ListItem
            button
            key='create-field'
            onClick={() => handleUrl(ROUTES.CREATE_FIELD)}>
            <ListItemIcon>
              <AddLocationIcon />
            </ListItemIcon>
            <ListItemText primary='Create Field' />
          </ListItem>
          <ListItem
            button
            key='language'
            onClick={() => handleUrl(ROUTES.REGISTER)}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary='Language' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='about'>
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            <ListItemText primary='About SportyBrosky' />
          </ListItem>

          <ListItem button key='contacts'>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary='Contact Us' />
          </ListItem>
          <ListItem button key='donate'>
            <ListItemIcon>
              <DonateIcon />
            </ListItemIcon>
            <ListItemText primary='Donate' />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default withRouter(Drawer);
