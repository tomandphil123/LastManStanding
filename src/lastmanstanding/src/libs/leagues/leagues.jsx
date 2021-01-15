import React, {useState} from 'react';
import CreateLeagues from './createLeagues';
import JoinLeagues from './joinLeagues';
import Button from '@material-ui/core/Button';

export default function Leagues(props) {

    const [createLeague, setCreateLeague] = useState(false);
    const [joinLeague, setJoinLeague] = useState(false);

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
        <Button variant="contained" color="primary" onClick={() => leagueCreation()}>Create League</Button>
        <Button variant="contained" color="primary" onClick={() => leagueJoin()}>Join League</Button>
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
        <h1>hello</h1>
        </>
    );
}