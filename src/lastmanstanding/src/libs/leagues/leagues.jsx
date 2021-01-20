import React, {useState} from 'react';
import CreateLeagues from './createLeagues';
import JoinLeagues from './joinLeagues';
import Button from '@material-ui/core/Button';
import LeagueCard from './leagueCard';
import IndividualLeague from './individualLeague';
import './leagues.css';
import axios from 'axios';
import LeagueTable from './leagueTable';
import PremierLeagueFixtures from '../homePage/premierLeagueFixtures';
import PremierLeagueResults from '../homePage/premierLeagueResults';
import Box from '@material-ui/core/Box';

export default function Leagues(props) {

    const [createLeague, setCreateLeague] = useState(false);
    const [joinLeague, setJoinLeague] = useState(false);
    const [individualLeague, setIndividualLeague] = useState(false);
    const [leagueInfo, setLeagueInfo] = useState();

    const displayLeague = () => {
        if (typeof props.myLeaguesInfo !== 'undefined'){
            return (
                <LeagueTable table={props.myLeaguesInfo} openLeague={openLeague}/>
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
        axios.post('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/getLeagueInfo', {leagueId: leagueId})
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
        <div className="myLeagues">
            <div className="buttons">
                <Button variant="contained" style={{backgroundColor: "#37003c", color: "#fff", margin: "10px", width: 250,}} onClick={() => leagueCreation()}><h4>Create League</h4></Button>
                <Button variant="contained" style={{backgroundColor: "#37003c", color: "#fff", margin: "10px", width: 250,}} onClick={() => leagueJoin()}><h4>Join League</h4></Button>
            </div>
            { createLeague ? (
                <CreateLeagues user={props.user} leagueCreation = {leagueCreation}/>
            ) : (
                <div></div>
            )}
            { joinLeague ? (
                <JoinLeagues user={props.user} leagueJoin = {leagueJoin}/>
            ) : (
                <div></div>
            )}
            { individualLeague ? (
                <Box display="flex" flexWrap="nowrap" p={1} m={1} padding = "3%"><IndividualLeague closeLeague={closeLeague} user={leagueInfo} username={props.user['username']}/></Box>
            ) : (
                <Box display="flex" flexWrap="nowrap" p={1} m={1} padding = "3%">
                    <Box paddingRight="4%">{ displayLeague() }</Box>
                </Box>
            )}
            <Box display="block" style={{align: 'right'}} p={1} m={1} padding = "3%">
                <Box paddingRight="4%"><PremierLeagueFixtures results={props.results}/></Box>
                <Box><PremierLeagueResults results={props.results}/></Box>
            </Box>
        </div>
        </>
    );
}