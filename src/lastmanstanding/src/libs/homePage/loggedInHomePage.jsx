import React from "react";
import PremierLeagueStandings from "./premierLeagueStandings";
import PremierLeagueFixtures from "./premierLeagueFixtures";
import PremierLeagueResults from "./premierLeagueResults";
import Grid from '@material-ui/core/Grid';


export default function LoggedInHomePage(props) {
    return ( 
            <>            
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={8}>
                    <PremierLeagueStandings results={props.results}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid item xs={12} style={{marginBottom:"20px"}}><PremierLeagueFixtures results={props.results}/></Grid>
                    <Grid item xs={12}><PremierLeagueResults results={props.results}/></Grid>
                </Grid>
            </Grid>
          </>
    )
}