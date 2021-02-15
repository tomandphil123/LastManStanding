import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



export default function WhatIsLmsCard() { 
    return(
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} md={6} align='center'>
          <Card>
                <CardActionArea>
                    <div style={{height: '155px', width: 'auto', background: '#000481'}}>
                        <img src={require('../../images/skysports-premier-league-predictions_5147427 (1).jpg')} height='155px' width='auto'/>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            What is Last Man Standing?
                        </Typography>
                        <Typography variant='body2' component='p'>
                            Last Man Standing is a competition in which a number of different users join or create leagues. Once in a league each user will pick a selection for the given gameweek. If this selection wins their match, the user will proceed to the next round. If the selection loses or draws their match, the user will be elimination from the competition. Once a user selects a team in that given league, they will not be able to pick that team again for the duration of that competition. Users can be a part of multiple leagues. The competition continues until there is only one person left standing. If all players get eliminated with no one left standing the league will be reset. If the competition gets to a point where all users have picked every team, the users will then be allow to repicked a previously picked team.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} align='center'>
            <Card>
                <CardActionArea>
                    <div style={{height: '155px', width: 'auto', background: '#0a0e71'}}>
                        <img src={require('../../images/skysports-salah-sterling-pogba_4614126.jpg')} height='155px' width='auto'/>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            How to Get Started?
                        </Typography>
                        <Typography variant='body2' component='p'>
                            <ul>
                            <ul>1. Create or Join a League</ul>
                            <ul>2. Enter your name and League name</ul>
                            <ul>3. Send the code to all your friends/colleagues</ul>
                            <ul>4. Try your best to win!</ul>
                            </ul>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
          </Grid>
        </Grid>
    );
};

