/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Auth} from 'aws-amplify';
import {useHistory, Link, withRouter} from 'react-router-dom';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
  },
  header: {
    background: '#37003c',
    top: '50px',
  },
  tabs: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signInTab: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'sticky',
  },
  signUpTab: {
    color: '#fff',
    fontWeight: 'bold',
    position: 'sticky',
  },
  signOutTab: {
    color: '#fff',
    fontWeight: 'bold',
    left: '90%',
    position: 'sticky',
  },
  logo: {
    height: 30,
    width: 70,
  },
  nav: {
    width: '100%',
    height: '60px',
  },
}));

const Navbar = ({
  auth,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogOut = async () => {
    try {
      Auth.signOut();
      auth.setAuthStatus(false);
      auth.setUser(null);
      history.push('');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    auth.isAuthenticated ?
    (
      <>
        <AppBar position="static" className={classes.header}>
          <Tabs>
            <Tab label={<div><img src={require('../../images/logo4.png')} className={classes.logo} alt="logo" textcolor="inherit"></img></div>} className={classes.tabs} component={Link} to="/"/>
            <Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Profile </div>} className={classes.tabs} component={Link} to="/Profile" />
            <Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} component={Link} to="/MyLeagues" />
            <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Out </div>} className={classes.signOutTab} onClick={(event) => handleLogOut(event)} />
          </Tabs>
        </AppBar>
      </>
    ) : (
      <>
        <AppBar position="static" className={classes.header}>
          <Tabs>
            <Tab label={<div><img src={require('../../images/logo4.png')} className={classes.logo} alt="logo" textcolor="inherit"></img></div>} className={classes.tabs} component={Link} to="/"/>
            <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab} component={Link} to="/SignIn"/>
            <Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>} className={classes.signUpTab} component={Link} to="/SignUp" />
          </Tabs>
        </AppBar>
      </>
    )
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default Navbar;
