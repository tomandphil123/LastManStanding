import React, {useState, useLayoutEffect} from 'react';
import CreateLeagues from './createLeagues';
import JoinLeagues from './joinLeagues';
import Button from '@material-ui/core/Button';
import LeagueCard from './leagueCard';
import axios from 'axios';
import './leagues.css';

function displayLeagues(response) {
    if (typeof response !== 'undefined'){
        return (
            response.map((item) => (
            <div className = "leagueCard">
                <LeagueCard leagueId = {item[0]['LeagueID']} leagueStatus={item[0]['Status']}/>
            </div>
        )))
    }
}

export default function Leagues(props) {

    const [createLeague, setCreateLeague] = useState(false);
    const [joinLeague, setJoinLeague] = useState(false);
    const [results, setResults] = useState();

    useLayoutEffect(() => {
        function fetchMyAPI() {
            if (props.user !== null ) {
                axios.post('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/myLeagues', {sub: props.user['attributes']['sub']})
                .then(response => {
                    setResults(response["data"])
                })   
            }
          }
        fetchMyAPI()
    }, [])


    const leagueCreation = () => {
        setCreateLeague(!createLeague);
        setJoinLeague(false);
    }

    const leagueJoin = () => {
        setJoinLeague(!joinLeague);
        setCreateLeague(false);
    }

    return (
        <>
        <div className="myLeagues">
            <div className="buttons">
                <Button variant="contained" style={{backgroundColor: "#37003c", color: "#fff", margin: "10px", width: 250,}} onClick={() => leagueCreation()}><h4>Create League</h4></Button>
                <Button variant="contained" style={{backgroundColor: "#37003c", color: "#fff", margin: "10px", width: 250,}} onClick={() => leagueJoin()}><h4>Join League</h4></Button>
            </div>
            { createLeague ? (
                <CreateLeagues user={props.user}/>
            ) : (
                <div></div>
            )}
            { joinLeague ? (
                <JoinLeagues user={props.user}/>
            ) : (
                <div></div>
            )}
            <div className="leagues">
            { displayLeagues(results) }
            </div>
        </div>
        </>
    );
}