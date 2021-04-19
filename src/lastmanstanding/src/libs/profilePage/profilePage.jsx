import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';


const ProfilePage = () => {
    const [teamInfo, setTeamInfo] = useState();

    useEffect(() => {
      axios.get('https://skysportsapi.herokuapp.com/sky/football/getteamnews/leedsunited/v1.0/')
        .then(response => {
            setTeamInfo(response['data'])
        })
    }, [])
    console.log(teamInfo)
    return (
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={4}>
            <Grid item xs={12} style={{marginBottom: '20px'}}>
              <h2>hello tom</h2>
            </Grid>
            <Grid item xs={12}>
            <List>
              {typeof teamInfo !== "undefined" ? (
                teamInfo.map(item => (
                  <>
                    <ListItem>
                    <Card>
                      <img src={item['imgsrc']} alt= "news image" height="auto" width="auto"/>
                    <CardContent>
                      <h3>{item["title"]}</h3>
                      <p>{item["shortdesc"]}</p>
                      <a href={item["link"]}>Read More</a>
                    </CardContent>
                    </Card>
                    </ListItem>
                  </>
                ))
              ) : (
                <CircularProgress style={{color: '#490050'}}/>
              )}
              </List>
            </Grid>
          </Grid>
      </Grid>
    )
}

export default ProfilePage;