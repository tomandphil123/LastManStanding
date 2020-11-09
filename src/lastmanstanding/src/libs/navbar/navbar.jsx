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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    props.auth.isAuthenticated
    ? (
      <>
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Home" className={classes.tabs} icon={<HomeIcon/>} {...a11yProps(0)} />
              <Tab label="Profile" className={classes.tabs} icon={<AccountCircleIcon/>} {...a11yProps(1)} />
              <Tab label="My Leagues" className={classes.tabs} icon={<ListAltIcon/>} {...a11yProps(2)} />
              <Tab label="Contact" className={classes.tabs} icon={<PhoneIcon/>} {...a11yProps(3)} />
              <Tab label="Sign Out" className={classes.signUpTab} icon={<ExitToAppIcon/>} {...a11yProps(4)} />
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
            <Tab label="Home" className={classes.tabs} icon={<HomeIcon/>} {...a11yProps(0)} />
            <Tab label="Sign In" className={classes.signInTab} icon={<ExitToAppIcon/>} {...a11yProps(1)} />
            <Tab label="Sign Up" className={classes.signUpTab} icon={<PersonAddIcon/>} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Hello
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignIn/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SignUp/>
        </TabPanel>
      </div>
      </>
    )
  );
}
