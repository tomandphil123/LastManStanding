import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



export default function WhatIsLmsCard() { 
    return(
        <Grid container direction='row' spacing={2}>
          <Grid item xs={12} md={6} align='center'>
          <Card style={{height: '335px'}}>
            <div style={{height: '155px', width: 'auto', background: '#000481'}}>
                <img src={require('../../images/skysports-premier-league-predictions_5147427 (1).jpg')} height='155px' width='auto'/>
            </div>
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    What is Last Man Standing?
                </Typography>
                <Typography variant='body2' component='p'>
                    Last Man Standing is a competition based on the Premier League. Users join/create leagues. You simply pick ONE Premier League team you fancy to win in round 1. If they win pick again next week, lose or draw and you're out. You can't pick the same team twice. The last person standing wins the competition.
                </Typography>
            </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} align='center'>
            <Card style={{height: '335px'}}>
                <div style={{height: '155px', width: 'auto', background: '#0a0e71'}}>
                    <img src={require('../../images/skysports-salah-sterling-pogba_4614126.jpg')} height='155px' width='auto'/>
                </div>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        How to Get Started?
                    </Typography>
                    <Typography variant='body2' component='p'>
                        <ul>
                        <ul>1. Create or join a league using the invitation code provided.</ul>
                        <ul>2. Make your pick for the given gameweek before the deadline.</ul>
                        <ul>3. If your team wins you proceed to the next round.</ul>
                        <ul>4. Forget to make a pick? The team highest in the table is selected.</ul>
                        <ul>5. Once you pick a team, you won't be able to pick the team again.</ul>
                        </ul>
                    </Typography>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
};

