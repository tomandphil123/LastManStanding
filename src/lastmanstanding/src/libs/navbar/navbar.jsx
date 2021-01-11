import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PhoneIcon from '@material-ui/icons/Phone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SignIn from '../signIn/signIn';
import SignUp from '../signUp/signUp';
import ForgotPassword from '../forgotPassword/forgotPassword';
import { Auth } from 'aws-amplify';
import LoggedInHomePage from '../homePage/loggedInHomePage';
import { Route, Link, BrowserRouter} from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

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
    paddingTop: '20px'
  },
  header: {
    background: "#37003c",
    boxShadow: "10px 10px 10px 10px"
  },
  tabs:{
    color:"white",
    fontWeight: "bold"
  },
  signInTab: {
    color:"white",
    fontWeight: "bold",
    right: "150px",
    position: "fixed",
  },
  signUpTab: {
    color:"white",
    fontWeight: "bold",
    right: "0px",
    position: "fixed",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  const setIsLoggedIn = async => {
    props.auth.setAuthStatus(true);
  }

  const handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.auth.setAuthStatus(false);
      props.auth.setUser(null);
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    props.auth.isAuthenticated
    ? (
      <>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
          <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                <Tabs value={location.pathname}>
                  <Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs} value = "/" component={Link} to="/"/>
                  <Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Profile </div>} className={classes.tabs} value="/Profile" component={Link} to="/Profile" />
                  <Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} value="/MyLeagues" component={Link} to="/MyLeagues" />
                  <Tab label={<div><PhoneIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Contact Us </div>} className={classes.tabs}  value="/ContactUs" component={Link} to="/ContactUs" />
                  <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Out </div>} className={classes.signUpTab} onClick={event => handleLogOut(event)} />
                </Tabs>
            </Fragment>
            )}
          />
          </AppBar>
          <Route path= "/" component={LoggedInHomePage}/>
          <Route path="/Profile"/>
          <Route path="/MyLeagues" />
          <Route path="/ContactUs" />
        </div>
      </BrowserRouter>
      </>
    ) : (
      <>
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
            <Route
              path="/"
              render={({ location }) => (
                <Fragment>
                  <Tabs value={location.pathname}>
                    <Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs}  value = "/" component={Link} to="/"/>
                    <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab}  value="/SignIn" component={Link} to="/SignIn"/>
                    <Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>}  className={classes.signUpTab} value="/SignUp" component={Link} to="/SignUp" />
                  </Tabs>
                </Fragment>
              )}
            />
          </AppBar>
            <Route path="/"/>
            <Route path="/SignIn" component={() => <SignIn isLoggedIn={setIsLoggedIn} />}/>
            <Route path="/SignUp" component={SignUp} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
        </div>
      </BrowserRouter>
      </>
    )
  );
}
