import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';



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

const CreateLeagues = ({
  user,
  setCreateLeague,
  setRender,
}) => {
  const [leagueName, setleagueName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const classes = useStyles();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstName === '') {
      alertify.set('notifier','position', 'top-center')
      alertify.warning('Please enter your first name');
    } else if (surname === '') {
      alertify.set('notifier','position', 'top-center')
      alertify.warning('Please enter your last name');
    } else if (leagueName === '') {
      alertify.set('notifier','position', 'top-center')
      alertify.warning('Please enter the league name');
    }  else {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/createLeague', {leagueName: leagueName, sub: user['attributes']['sub'], email: user['attributes']['email'], username: user['username'], firstName: firstName, lastName: surname})
          .then((response) => {
            alertify.set('notifier','position', 'top-center');
            response['data'] === 'Successfully created league!' ? (alertify.success(response['data'])):(alertify.error(response['data']));
            setRender({});
            setCreateLeague(false);
          });
      }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" style={{backgroundColor: '#fff'}}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Create League
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange= {(event) => setFirstName(event.target.value)}
                  inputProps={{'data-testid': 'firstName'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange= {(event) => setSurname(event.target.value)}
                  inputProps={{'data-testid': 'lastName'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="leagueName"
                  label="League Name"
                  name="leagueName"
                  autoComplete="uname"
                  onChange= {(event) => setleagueName(event.target.value)}
                  inputProps={{'data-testid': 'leagueName'}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => handleSubmit(event)}
            >
                Create League
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

CreateLeagues.propTypes = {
  user: PropTypes.object.isRequired,
  setCreateLeague: PropTypes.func.isRequired,
  setRender: PropTypes.func.isRequired,
};

export default CreateLeagues;

