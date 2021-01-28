import React, {useState, useEffect} from 'react';
import CreateLeagues from './createLeagues';
import JoinLeagues from './joinLeagues';
import Button from '@material-ui/core/Button';
import IndividualLeague from './individualLeague';
import './leagues.css';
import axios from 'axios';
import LeagueTable from './leagueTable';
import PremierLeagueFixtures from '../homePage/premierLeagueFixtures';
import PremierLeagueResults from '../homePage/premierLeagueResults';
import Grid from '@material-ui/core/Grid';

export default function Leagues(props) {

    const [createLeague, setCreateLeague] = useState(false);
    const [joinLeague, setJoinLeague] = useState(false);
	const [individualLeague, setIndividualLeague] = useState(false);
	const [leagueInfo, setLeagueInfo] = useState();
	const [myLeaguesInfo, setMyLeaguesInfo] = useState();

    useEffect(() => {
		if (props.user !== null) {
			axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/myLeagues', {sub: props.user['attributes']['sub']})
			.then(response => {
				setMyLeaguesInfo(response["data"])
		}

	)}}, [props.user])

    const displayLeague = () => {
        if (typeof myLeaguesInfo !== 'undefined'){
            return (
                <LeagueTable table={myLeaguesInfo} openLeague={openLeague}/>
            )
        }
    }

    const leagueCreation = () => {
        setCreateLeague(!createLeague);
        setJoinLeague(false);
    }

    const leagueJoin = () => {
        setJoinLeague(!joinLeague);
        setCreateLeague(false);
    }

    const openLeague = (leagueId) => {
        axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getLeagueInfo', {leagueId: leagueId})
          .then(response => { 
              setLeagueInfo(response)
          }) 
        setIndividualLeague(!individualLeague);
    }

    const closeLeague = () => {
        setIndividualLeague(!individualLeague);
    }

    return (
        <>
            <Grid container direction="row" spacing={2}>
				<Grid item xs={12} md={8} align="center">
                    <Grid item xs={12} md={8} className="buttons">
                            <Button style={{backgroundColor: "#37003c", color: "#fff", marginTop: "10px", marginBottom: "25px", marginRight: "10px", width: 250}} variant="contained" onClick={() => leagueCreation()}><h4>Create League</h4></Button>
                            <Button style={{backgroundColor: "#37003c", color: "#fff", marginTop: "10px", marginBottom: "25px", width: 250}} variant="contained" onClick={() => leagueJoin()}><h4>Join League</h4></Button>
                        { createLeague ? (
                            <CreateLeagues user={props.user} leagueCreation = {leagueCreation}/>
                        ) : (
                            null
                        )}
                        { joinLeague ? (
                            <JoinLeagues user={props.user} leagueJoin = {leagueJoin}/>
                        ) : (
                            null
                        )}
                    </Grid>
                    <Grid item xs={12} md={8}>
						<div>
							{displayLeague()}
						</div>
                    </Grid>
                    { individualLeague ? (
						<Grid item xs={12} md={8}>
                        	<IndividualLeague closeLeague={closeLeague} user={leagueInfo} username={props.user['username']} sub={props.user['attributes']['sub']} />
                        </Grid>
                    ) : (
                        null
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <div>
                        <Grid item xs={12} style={{marginBottom:"20px"}}>
                            <PremierLeagueFixtures results={props.results}/>
                        </Grid>
                        <Grid item xs={12}>
                            <PremierLeagueResults results={props.results}/>
                        </Grid>
                    </div>
				</Grid>
            </Grid>
        </>
    );
}