import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

export default function CreateLeagues(props) {
    const [leagueName, setleagueName] = useState('');

    const classes = useStyles();
    const handleSubmit = async event => {
        event.preventDefault()
        axios.post('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/createLeague', {leagueName: leagueName, sub: props.user['attributes']['sub'], email: props.user['attributes']['email'], username: props.user['username']})
          .then(response => { 
              alert("Successfully Created League!")
          })   
      }

    return (
        <>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create League
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="leagueName"
                label="League Name"
                name="leagueName"
                autoComplete="uname"
                autoFocus
                onChange= {event => setleagueName(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={event => handleSubmit(event)}
              >
                Create League
              </Button>
            </form>
          </div>
        </Container>
      </>
    )
}