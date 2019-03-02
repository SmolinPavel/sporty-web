import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import { ROUTES } from '../../constants';
import Drawer from '../Drawer';

import { styles } from './styles';

class PrimarySearchAppBar extends React.PureComponent {
  state = {
    anchorEl: null,
    isDrawerOpen: false,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  goToLogin = () => {
    this.props.history.push(ROUTES.LOGIN);
  };

  goToMain = () => {
    this.props.history.push(ROUTES.ROOT);
  };

  handleMobileGoToLogin = () => {
    this.handleMobileMenuClose();
    this.goToLogin();
  };

  handleMobileGoToMain = () => {
    this.handleMobileMenuClose();
    this.goToMain();
  };

  toggleDrawer = () =>
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileGoToMain}>
          <IconButton color='inherit'>
            <Badge badgeContent={1} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Home</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileGoToLogin}>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Menu>
    );

    return (
      <>
        <div className={classes.root}>
          <AppBar position='fixed'>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color='inherit'
                aria-label='Open drawer'
                onClick={this.toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
                <Typography
                  className={classes.title}
                  variant='h6'
                  color='inherit'
                  noWrap>
                  SportyBrosky
                </Typography>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <div className={classes.grow} />
              {this.props.isAuth && (
                <Typography
                  className={classes.title}
                  variant='h6'
                  color='inherit'
                  noWrap>
                  Hi, {this.props.name} 🤣
                </Typography>
              )}
              <div className={classes.sectionDesktop}>
                {this.props.isAuth ? (
                  <>
                    <IconButton color='inherit'>
                      <Badge badgeContent={4} color='secondary'>
                        <MailIcon />
                      </Badge>
                    </IconButton>
                    <IconButton color='inherit'>
                      <Badge badgeContent={17} color='secondary'>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup='true'
                      onClick={this.handleProfileMenuOpen}
                      color='inherit'>
                      <AccountCircle />
                    </IconButton>
                  </>
                ) : (
                  <Link
                    to={ROUTES.LOGIN}
                    style={{ color: 'white', textDecoration: 'none' }}>
                    <Button color='inherit'>Login</Button>
                  </Link>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup='true'
                  onClick={this.handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
        <Drawer isOpen={this.state.isDrawerOpen} onClick={this.toggleDrawer} />
      </>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default withRouter(withStyles(styles)(PrimarySearchAppBar));
