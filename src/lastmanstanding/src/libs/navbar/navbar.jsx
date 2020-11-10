import React from 'react';
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
import { Auth } from 'aws-amplify'

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '20px'
  },
  header: {
    backgroundColor: "#3D195B",
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
  const [value, setValue] = React.useState(0);

  const setIsLoggedIn = async => {
    props.auth.setAuthStatus(true);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
            <Tabs e={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs} {...a11yProps(0)}/>
              <Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Profile </div>} className={classes.tabs} {...a11yProps(1)} />
              <Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} {...a11yProps(2)} />
              <Tab label={<div><PhoneIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Contact Us </div>} className={classes.tabs} {...a11yProps(3)} />
              <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Out </div>} className={classes.signUpTab} {...a11yProps(4)} onClick={event => handleLogOut(event)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Home
          </TabPanel>
          <TabPanel value={value} index={1}>
            Profile
          </TabPanel>
          <TabPanel value={value} index={2}>
            My Leagues
          </TabPanel>
          <TabPanel value={value} index={3}>
            Contact
          </TabPanel>
        </div>
      </>
    ) : (
      <>
        <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs} {...a11yProps(0)} />
            <Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab} {...a11yProps(1)} />
            <Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>}  className={classes.signUpTab} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Hello
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignIn isLoggedIn={setIsLoggedIn}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SignUp/>
        </TabPanel>
      </div>
      </>
    )
  );
}
