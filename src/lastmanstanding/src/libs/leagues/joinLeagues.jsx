/* eslint-disable max-len */
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

const JoinLeagues = ({
  user,
  setJoinLeague,
  setRender,
}) => {
  const [leagueCode, setleagueCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const classes = useStyles();
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/joinLeague', {leagueCode: leagueCode, sub: user['attributes']['sub'], username: user['username'], firstName: firstName, lastName: surname})
        .then((response) => {
          alert(response['data']);
          setRender({});
          setJoinLeague(false);
        });
  };

  return (
    <>
      <Container component="main" maxWidth="xs" style={{backgroundColor: '#fff'}}>
        <div className={classes.paper}>
          {/* <Button color="primary" onClick={() => leagueJoin()}><CloseIcon/></Button> */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Join League
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
                  label="League Code"
                  name="leagueName"
                  autoComplete="uname"
                  onChange= {(event) => setleagueCode(event.target.value)}
                  inputProps={{'data-testid': 'leagueCode'}}
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
                Join League
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

JoinLeagues.propTypes = {
  user: PropTypes.object.isRequired,
  setJoinLeague: PropTypes.func.isRequired,
  setRender: PropTypes.func.isRequired,
};

export default JoinLeagues;
