import React, {useState} from 'react';
import CreateLeagues from './createLeagues';
import JoinLeagues from './joinLeagues';
import Button from '@material-ui/core/Button';
import LeagueCard from './leagueCard';
import IndividualLeague from './individualLeague';
import './leagues.css';


export default function Leagues(props) {

    const [createLeague, setCreateLeague] = useState(false);
    const [joinLeague, setJoinLeague] = useState(false);
    const [individualLeague, setIndividualLeague] = useState(false)

    const displayLeague = () => {
        if (typeof props.myLeaguesInfo !== 'undefined'){
            return (
                props.myLeaguesInfo.map((item) => (
                <div className = "leagueCard">
                    <LeagueCard leagueId = {item[0]['LeagueID']} leagueStatus={item[0]['Status']} openLeague={openLeague}/>
                </div>
            )))
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

    const openLeague = () => {
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
                <IndividualLeague openLeague={openLeague}/>
            ) : (
                <div/>
            )}
            <div className="leagues">
            { displayLeague() }
            </div>
        </div>
        </>
    );
}