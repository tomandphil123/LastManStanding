import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3D195B',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#3D195B'
  }
}));

export default function SignIn(props){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await Auth.signIn({
        username,
        password,
      });
      setIsLoggedIn();
      //props.auth.setAuthStatus(true);
      //props.auth.setUser(user);
      history.push("/")
    } catch (error) {
      alert(error.message);
    }
  }

  const setIsLoggedIn = (event) => {
    props.isLoggedIn()
  }  
  
  const getBack = () => {
    history.push("/ForgotPassword");
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="uname"
              autoFocus
              onChange= {event => setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange= {event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={event => handleSubmit(event)}
            >
              Sign In
            </Button>
              <div>
                <Link onClick={event => getBack()} >
                  Forgot Password?
                </Link>
              </div>
          </form>
        </div>
      </Container>
    </>
  );
}