import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AnnouncementIcon from '@material-ui/icons/Announcement';

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
  avatar: {
    backgroundColor: '#490050',
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
    },[user])
    
    return (
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} md={3}>
            <Card >
              <CardHeader avatar={
                <Avatar aria-label='account' className={classes.avatar}>
                  <AccountCircleIcon/>
                </Avatar>} 
                title='Account'
              />
              <Divider/>
              <CardContent>
                <List>
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <ListItem>Username: {myInfo[0]['Username']}</ListItem>
                      <ListItem>Email: {myInfo[0]['email']}</ListItem>
                      <ListItem>Favourite Team: {myInfo[0]['favouriteTeam']}</ListItem>
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
              <CardHeader avatar={
                <Avatar aria-label='results' className={classes.avatar}>
                  <AssessmentIcon/>
                </Avatar>} 
                title='Results'
              />
              <Divider/>
              <CardContent>
                <List>
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <ListItem>Wins: {myInfo[0]['wins']}</ListItem>
                      <ListItem>Losses: {myInfo[0]['losses']}</ListItem>
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
            <CardHeader avatar={
                <Avatar aria-label='active competitions' className={classes.avatar}>
                  <CheckCircleIcon/>
                </Avatar>} 
                title='Active Competitions'
            />
              <Divider/>
              <CardContent>
                <List>
                  {typeof myInfo !== 'undefined' ? (
                    <>
                      <h1>Leagues:</h1>
                      { myInfo[0]['leagueIDs'].map(item => (
                        <>
                          <ListItem>{item}</ListItem>
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
              <CardHeader avatar={
                <Avatar aria-label='team news' className={classes.avatar}>
                  <AnnouncementIcon/>
                </Avatar>} 
                title='Your Favourite Teams News!'
              />
              <Divider/>
              <CardContent>
                  {typeof teamInfo !== 'undefined' ? (
                    teamInfo.map(item => (
                      <List>
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
                      </List>
                    ))
                  ) : (
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
                      <CircularProgress style={{color: '#490050', marginRight:'12px'}}/>
                      <p>Loading news</p>
                    </div>
                  )}
                </CardContent>
            </Card>
          </Grid>
        </Grid>
    )
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  results: PropTypes.object,
};

ProfilePage.defaultProps = {
  user: {},
  results: {},
};

export default ProfilePage;