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
import { Auth } from 'aws-amplify';
import { useHistory, Link, withRouter} from "react-router-dom";

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
    // paddingTop: '3%',
    display: "flex",
  },
  header: {
    background: "#37003c",
    // boxShadow: "5px 5px 5px 5px",
  },
  tabs:{
    color:"white",
    fontWeight: "bold",
  },
  signInTab: {
    color:"white",
    fontWeight: "bold",
    left: "80%",
    position: "sticky"
  },
  signUpTab: {
    color:"white",
    fontWeight: "bold",
    left: "90%",
    position: "sticky",
  },
  signOutTab: {
    color:"white",
    fontWeight: "bold",
    left: "90%",
    position: "sticky",
  },
  contactTab: {
    color:"white",
    fontWeight: "bold",
    left: "77%",
    position: "sticky",
  },
  logo:{
    display: "flex",
    order: 1
  },
  nav:{
    display: "flex",
    order: 2,
    width: "100%",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      props.auth.setAuthStatus(false);
	  props.auth.setUser(null);
	  history.push("/")
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    props.auth.isAuthenticated
    ? (
      <>
      <nav>
        <div className={classes.root}>
        <div className={classes.logo}>
          <img src={require("../../images/logo3.png")} class={classes.Applogo} alt="logo" width="100px" textcolor="inherit" value="0"></img>
        </div>
			<div className={classes.nav}>
				<AppBar position="sticky" className={classes.header}>
					<Tabs>
						<Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs} value = "/" component={Link} to="/"/>
						<Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Profile </div>} className={classes.tabs} value="/Profile" component={Link} to="/Profile" />
						<Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} value="/MyLeagues" component={Link} to="/MyLeagues" />
						<Tab label={<div><PhoneIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Contact Us </div>} className={classes.contactTab}  value="/ContactUs" component={Link} to="/ContactUs" />
						<Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Out </div>} className={classes.signOutTab} onClick={event => handleLogOut(event)} />
					</Tabs>
				</AppBar>
			</div>
        </div>
      </nav>
      </>
    ) : (
      <>
      <nav>
        <div className={classes.root}>
			<div className={classes.logo}>
				<img src={require("../../images/logo3.png")} class={classes.Applogo} width="100px" alt="logo" textcolor="inherit" value="0"></img>
			</div>
      <div className={classes.logoBackground}></div>
			<div className={classes.nav}>
				<AppBar position="sticky" className={classes.header}>
					<Tabs>
						<Tab label={<div><HomeIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Home </div>} className={classes.tabs}  value = "/" component={Link} to="/"/>
						<Tab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign In </div>} className={classes.signInTab}  value="/SignIn" component={Link} to="/SignIn"/>
						<Tab label={<div><PersonAddIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Sign Up </div>}  className={classes.signUpTab} value="/SignUp" component={Link} to="/SignUp" />
					</Tabs>
				</AppBar>
			</div>
        </div>
      </nav>
      </>
    )
  );
}

export default withRouter(Navbar);