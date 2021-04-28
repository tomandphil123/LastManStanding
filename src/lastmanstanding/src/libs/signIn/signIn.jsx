import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Auth} from 'aws-amplify';
import {Link, useHistory} from 'react-router-dom';
import alertify from 'alertifyjs';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#490050',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#490050',
  },
}));

const SignIn = ({
  setUser,
  isLoggedIn,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === '') {
      alertify.set('notifier','position', 'top-center')
      alertify.warning('Please enter a password');
    } else if (username === '') {
      alertify.set('notifier','position', 'top-center')
      alertify.warning('Please enter a username');
    }
    else {
      try {
        const user = await Auth.signIn({
          username,
          password,
        });
        setIsLoggedIn();
        setUser(user);
        history.push('/');
      } catch (error) {
        console.log(error.message)
        if (error.message === 'User is not confirmed.'){
          alertify.set('notifier','position', 'top-center')
          alertify.warning('Email address is not verified.\n Please verify your email.')
        } else{
          alertify.set('notifier','position', 'top-center')
          alertify.error(error.message)
        }
      }
    }
  };

  const setIsLoggedIn = (event) => {
    isLoggedIn();
  };

  const getBack = () => {
    history.push('/ForgotPassword');
  };

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
              onChange= {event => setUsername(event.target.value.toLowerCase())}
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
              onChange= {(event) => setPassword(event.target.value)}
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
              onClick={(event) => handleSubmit(event)}
            >
              Sign In
            </Button>
            <div>
              <Link to="/forgotPassword" onClick={(event) => getBack()} >
                    Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

SignIn.propTypes = {
  isLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default SignIn;
