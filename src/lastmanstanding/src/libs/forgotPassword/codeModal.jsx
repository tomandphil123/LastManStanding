import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    backgroundColor: '#37003c',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#37003c',
  },
}));

const CodeModal = ({
    getBack,
    username,
    setUsername,
}) => {

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();
    const history = useHistory();

    const handleCodeSubmit = async (event) => {
        event.preventDefault();
        if (code === '') {
          alertify.set('notifier','position', 'top-center')
          alertify.warning('Please enter a code');
        } else if (password === '') {
          alertify.set('notifier','position', 'top-center')
          alertify.warning('Please enter a password');
        } else {
          try {
            await Auth.forgotPasswordSubmit(username, code, password)
                .then(() => {
                  history.push('/SignIn');
                })
                .catch((error) => alertify.set('notifier','position', 'top-center'), alertify.success('Password Successfully Changed!'), history.push('/SignIn'));
                
          } catch (error) {
            console.log(error.message);
          }
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
              Confirm Code
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
                  onChange= {(event) => setUsername(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Verification Code"
                  name="code"
                  autoComplete="code"
                  onChange= {(event) => setCode(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange= {(event) => setPassword(event.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => handleCodeSubmit(event)}
                >
              Submit
                </Button>
              </form>

              <Link onClick={(event) => getBack()}>
            Back to Sign In
              </Link>
            </div>
          </Container>
    )
}

export default CodeModal;