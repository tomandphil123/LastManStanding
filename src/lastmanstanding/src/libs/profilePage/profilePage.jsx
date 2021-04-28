import React, { useEffect, useState } from 'react';
import UserInfo from './userInfo';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ResultsRatio from './resultsRatio';
import News from './news';
import SelectFavouriteTeam from './selectFavouriteTeam';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    backgroundColor: '#490050',
  },
  margin:{
    height:'26px',
    fontSize: '13px'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const selectTeam = (team) => {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/profileInfo', {sub: user['attributes']['sub'], team: teams[team], flag: 'setTeam'})
        .then(response => {
          setmyInfo(response['data']);
          alertify.set('notifier','position', 'top-center')
          alertify.success('Successfully Updated Favourite Team')
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
                      <UserInfo myInfo={myInfo} teams={teams} setmyTeam={setmyTeam}/>
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
                    <ResultsRatio myInfo={myInfo} />
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
                    <News myInfo={myInfo} teamInfo={teamInfo} setmyTeam={setmyTeam} />
                  ) : (
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
                      <CircularProgress style={{color: '#490050', marginRight:'12px'}}/>
                    </div>
                  )}
                </CardContent>
            </Card>
              <SelectFavouriteTeam 
                myTeam={myTeam}
                setmyTeam={setmyTeam}
                teams={teams}
                selectTeam={selectTeam}
              />
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