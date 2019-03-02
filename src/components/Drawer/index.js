import React from 'react';
import { withRouter } from 'react-router-dom';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LockIcon from '@material-ui/icons/Lock';

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
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Register' />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key='about'>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary='About' />
          </ListItem>

          <ListItem button key='contacts'>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary='Contacts' />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default withRouter(Drawer);
