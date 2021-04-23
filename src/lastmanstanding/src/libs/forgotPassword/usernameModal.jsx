import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Auth} from 'aws-amplify';
import {Link} from 'react-router-dom';
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

const UsernameModal = ({
    getBack,
    handleCodeSent,
    username,
    setUsername
}) => {
    const classes = useStyles();

    const getCode = async (event) => {
        event.preventDefault();
    
        try {
          await Auth.forgotPassword(username);
          handleCodeSent();
        } catch (error) {
          alertify.set('notifier','position', 'top-center');
          alertify.error(error.message);
        }
      };


    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Forgot Password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="Username"
              autoComplete="uname"
              autoFocus
              onChange= {(event) => setUsername(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => getCode(event)}
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

export default UsernameModal;