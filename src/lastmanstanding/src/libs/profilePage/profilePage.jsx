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
import {withStyles, makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';

const BootstrapButton = withStyles({
  root: {
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'backgroundColor': '#ffff',
    'color': '#490050',
    'borderColor': '#490050',
    '&:hover': {
      backgroundColor: '#490050',
      color: '#ffff',
      borderColor: '#490050',
      boxShadow: '#490050',
    },
    '&:active': {
      color: '#ffff',
      backgroundColor: '#490050',
      borderColor: '#490050',
    },
    '&:focus': {
      color: '#ffff',
      borderColor: '#490050',
      backgroundColor: '#490050',
    },
  },
})(Button);

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
  margin:{
    height:'26px',
    fontSize: '13px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    overflow: 'scroll',
  },
}));

const ProfilePage = ({
  user
}) => {

    const [teamInfo, setTeamInfo] = useState();
    const [myInfo, setmyInfo] = useState();
    const [myTeam, setmyTeam] = useState(false);

    const classes = useStyles();

    const teams = {
        'Arsenal FC': 'arsenal',
        'Aston Villa FC': 'astonvilla',
        'Brighton & Hove Albion FC': 'brightonandhovealbion',
        'Burnley FC': 'burnley',
        'Chelsea FC': 'chelsea',
        'Crystal Palace FC': 'crystalpalace',
        'Everton FC': 'everton',
        'Fulham FC' : 'fulham',
        'Leeds United FC': 'leedsunited',
        'Leicester City FC': 'leicestercity',
        'Liverpool FC': 'liverpool',
        'Manchester City FC': 'manchestercity',
        'Manchester United FC': 'manchesterunited',
        'Newcastle United FC': 'newcastleunited',
        'Sheffield United FC': 'sheffieldunited',
        'Southampton FC': 'southampton',
        'Totenham Hotspur FC': 'totenhamhotspur',
        'West Bromwich Albion FC': 'westbromwichalbion',
        'West Ham United FC': 'westhamunited',
        'Wolverhampton Wanderers FC': 'wolverhamptonwanderers',
    }

    useEffect(() => {
        axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/profileInfo', {sub: user['attributes']['sub'], flag: 'getTeam'})
        .then(response => {
            setmyInfo(response['data']);
            if (response['data'][0]['favouriteTeam'] !== '-'){
              axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getNews', {team: response['data'][0]['favouriteTeam']})
              .then(response => {
                setTeamInfo(response['data'])
              });
            }
        });
    },[user, teamInfo])

    const selectTeam = (team) => {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/profileInfo', {sub: user['attributes']['sub'], team: teams[team], flag: 'setTeam'})
        .then(response => {
          alert(response['data']);
        });

        axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getNews', {team: teams[team]})
        .then(response => {
          setTeamInfo(response['data'])
        });
    }
    
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
                      {myInfo[0]['favouriteTeam'] === '-' ? (
                        <ListItem>Favourite Team: Select your favourite team!</ListItem>
                      ):(
                        <ListItem>Favourite Team: {Object.keys(teams).find(key => teams[key] === myInfo[0]['favouriteTeam'])}
                        <Button
                        onClick={() => setmyTeam(true)}
                        style={{minWidth: '36px'}}>
                        <AddCircleOutlineIcon/>
                      </Button></ListItem>
                      )}
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
                  {typeof myInfo !== 'undefined' ? (
                    myInfo[0]['favouriteTeam'] !== '-' ? (
                      typeof teamInfo !== 'undefined' ? (
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
                      )
                  ) : (
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
                      <h1>Choose your favourite team!</h1>
                      <Button onClick={() => setmyTeam(true)}>
                        <AddCircleOutlineIcon/>
                      </Button>
                    </div>
                  )) : (
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
                      <CircularProgress style={{color: '#490050', marginRight:'12px'}}/>
                    </div>
                  )}
                </CardContent>
            </Card>
            {myTeam ? (
              <Backdrop className={classes.backdrop} open={myTeam}>
                <Card style={{overflow: 'scroll', height: '650px'}}>
                  <CardHeader avatar={
                    <Avatar aria-label='team news' className={classes.avatar}>
                      <AnnouncementIcon/>
                    </Avatar>} 
                    title='Pick Team'
                    action={
                      <div align='right' style={{paddingTop: '10px'}}>
                        <Button onClick={() => setmyTeam(!myTeam)}>
                          <CloseIcon/>
                        </Button>
                      </div>
                    }
                  />
                  <Divider/>
                  <CardContent>
                    <List>
                      { Object.keys(teams).map((item, i) => (
                        <>
                          <ListItem>
                          <BootstrapButton
                            key={item}
                            variant='contained'
                            disableRipple
                            className={classes.margin}
                            onClick={() => {selectTeam(item); setmyTeam(false)}}
                          >
                              {item}
                          </BootstrapButton>
                          </ListItem>
                        </>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Backdrop>
            ) : (null)}
            
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