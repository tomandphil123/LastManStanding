import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
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
    display: "flex",
  },
  header: {
    background: "#37003c",
  },
  tabs:{
    color:"#fff",
    fontWeight: "bold",
  },
  signInTab: {
    color:"#fff",
    fontWeight: "bold",
    left: "80%",
    position: "sticky"
  },
  signUpTab: {
    color:"#fff",
    fontWeight: "bold",
    left: "90%",
    position: "sticky",
  },
  signOutTab: {
    color:"#fff",
    fontWeight: "bold",
    left: "90%",
    position: "sticky",
  },
  contactTab: {
    color:"#ffff",
    fontWeight: "bold",
    left: "77%",
    position: "sticky",
  },
  logo:{
    height: 30,
    width: 70
  },
  nav:{
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
          <img src={require("../../images/logo3.png")} className={classes.Applogo} alt="logo" width="100px" textcolor="inherit" value="0"></img>
        </div>
			<div className={classes.nav}>
				<AppBar position="fixed" className={classes.header}>
					<Tabs>
						<Tab label={<div><img src={require("../../images/logo4.png")} className={classes.logo} alt="logo" textcolor="inherit" value="0"></img></div>} className={classes.tabs} value = "/" component={Link} to="/"/>
						<Tab label={<div><AccountCircleIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> Profile </div>} className={classes.tabs} value="/Profile" component={Link} to="/Profile" />
						<Tab label={<div><ListAltIcon style={{verticalAlign: 'middle', paddingBottom: '4px'}}/> My Leagues </div>} className={classes.tabs} value="/MyLeagues" component={Link} to="/MyLeagues" />
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
				<img src={require("../../images/logo3.png")} className={classes.Applogo} width="1%" alt="logo" textcolor="inherit" value="0"></img>
			</div>
      <div className={classes.logoBackground}></div>
			<div className={classes.nav}>
				<AppBar position="fixed" className={classes.header}>
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