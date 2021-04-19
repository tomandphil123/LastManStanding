import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    paddingRight: '8px'
  },
}));

const ProfilePage = ({
  user
}) => {

    const [teamInfo, setTeamInfo] = useState();
    const [myInfo, setmyInfo] = useState();
    const classes = useStyles();

    useEffect(() => {
        axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/profileInfo', {sub: user['attributes']['sub']})
        .then(response => {
            setmyInfo(response['data']);
            if (response['data'][0]['favouriteTeam'] !== '-'){
              axios.get(`https://skysportsapi.herokuapp.com/sky/football/getteamnews/${response['data'][0]['favouriteTeam']}/v1.0/`)
              .then(response => {
                  setTeamInfo(response['data'])
              })
            }
        });
    },[])
    
    return (
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} md={3}>
            <Card >
              <CardHeader title='Profile!'/>
              <Divider/>
              <CardContent>
                <List>
                  {console.log(myInfo)}
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <p>Username: {myInfo[0]['Username']}</p>
                      <p>Email: {myInfo[0]['email']}</p>
                      <p>Favourite Team: {myInfo[0]['favouriteTeam']}</p>
                    </>
                  ) : (
                    <CircularProgress style={{color: '#490050'}}/>
                  )}
                  </List>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid item xs={12} md={12}>
            <Card>
              <CardHeader title='Record!'/>
              <Divider/>
              <CardContent>
                <List>
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <p>Wins: {myInfo[0]['wins']}</p>
                      <p>Losses: {myInfo[0]['losses']}</p>
                    </>
                  ) : (
                    <CircularProgress style={{color: '#490050'}}/>
                  )}
                  </List>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} md={12}>
            <Card >
              <CardHeader title='Active Competitions!'/>
              <Divider/>
              <CardContent>
                <List>
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <h1>Leagues:</h1>
                      {console.log(myInfo[0]['leagueIDs'])}
                      { myInfo[0]['leagueIDs'].map(item => (
                        <>
                          {item}<br />
                        </>
                      ))}
                    </>
                  ) : (
                    <CircularProgress style={{color: '#490050'}}/>
                  )}
                  </List>
                </CardContent>
            </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={{overflow: 'scroll', height: '650px'}}>
              <CardHeader title='Your Favourite Teams News!'/>
              <Divider/>
              <CardContent>
                <List>
                  {typeof teamInfo !== 'undefined' ? (
                    teamInfo.map(item => (
                      <>
                        <ListItem alignItems='flex-start'>
                          <ListItemAvatar>
                            <Avatar variant='square' alt='News' src={item['imgsrc']} className={classes.square}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={<a href={item['link']}>{item['title']}</a>}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component='span'
                                  variant='body2'
                                  color='textPrimary'>
                                  <p>{item['shortdesc']}</p>
                                </Typography>
                              </React.Fragment>}/>
                        </ListItem>
                        <Divider light />
                      </>
                    ))
                  ) : (
                    <CircularProgress style={{color: '#490050'}}/>
                  )}
                  </List>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
    )
}

export default ProfilePage;