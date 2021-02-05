/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const Leagues = ({
  user,
  results,
}) => {
  const [createLeague, setCreateLeague] = useState(false);
  const [joinLeague, setJoinLeague] = useState(false);
  const [individualLeague, setIndividualLeague] = useState(false);
  const [leagueInfo, setLeagueInfo] = useState();
  const [myLeaguesInfo, setMyLeaguesInfo] = useState();

  useEffect(() => {
    if (user !== null) {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/myLeagues', {sub: user['attributes']['sub']})
          .then((response) => {
            setMyLeaguesInfo(response['data']);
          });
    }
  }, [user]);

  const displayLeague = () => {
    if (typeof myLeaguesInfo !== 'undefined') {
      return (
        <LeagueTable table={myLeaguesInfo} openLeague={openLeague}/>
      );
    }
  };

  const leagueCreation = () => {
    setCreateLeague(!createLeague);
    setJoinLeague(false);
  };

  const leagueJoin = () => {
    setJoinLeague(!joinLeague);
    setCreateLeague(false);
  };

  const openLeague = (leagueId) => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getLeagueInfo', {leagueId: leagueId})
        .then((response) => {
          setLeagueInfo(response);
        });
    setIndividualLeague(!individualLeague);
  };

  const closeLeague = () => {
    setIndividualLeague(!individualLeague);
  };

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={8} align="center">
          <Grid item xs={12} md={8} className="buttons">
            { window.screen.width > 1100 ? (
              <>
              <Button style={{backgroundColor: 'white', color: '#490050', marginTop: '10px', marginBottom: '5px', marginRight: '10px', width: 250, border: '4px solid #490050'}} variant="contained" onClick={() => leagueCreation()}><AddCircleOutlineIcon /><h4 style={{paddingLeft:'5px'}}>Create League</h4></Button>
              <Button style={{backgroundColor: 'white', color: '#490050', marginTop: '10px', marginBottom: '5px', width: 250, border: '4px solid #490050'}} variant="contained" onClick={() => leagueJoin()}><PeopleAltIcon/><h4 style={{paddingLeft:'5px'}}>Join League</h4></Button>
              </>
            ):(
              <>
              <Button style={{backgroundColor: 'white', color: '#490050', marginTop: '10px', marginBottom: '5px', width: 250, border: '4px solid #490050'}} variant="contained" onClick={() => leagueCreation()}><AddCircleOutlineIcon /><h4 style={{paddingLeft:'5px'}}>Create League</h4></Button>
              <Button style={{backgroundColor: 'white', color: '#490050', marginTop: '10px', marginBottom: '5px', width: 250, border: '4px solid #490050'}} variant="contained" onClick={() => leagueJoin()}><PeopleAltIcon/><h4 style={{paddingLeft:'5px'}}>Join League</h4></Button>
              </>
            )}
            { createLeague ? (
                            <CreateLeagues user={user} leagueCreation = {leagueCreation} setCreateLeague = {setCreateLeague}/>
                        ) : (
                            null
                        )}
            { joinLeague ? (
                            <JoinLeagues user={user} leagueJoin = {leagueJoin}/>
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
              <IndividualLeague closeLeague={closeLeague} user={leagueInfo} username={user['username']} sub={user['attributes']['sub']}/>
            </Grid>
          ) : (
            null
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <Grid item xs={12} style={{marginBottom: '20px'}}>
              <PremierLeagueFixtures results={results}/>
            </Grid>
            <Grid item xs={12}>
              <PremierLeagueResults results={results}/>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

Leagues.propTypes = {
  user: PropTypes.object,
  results: PropTypes.object,
};

Leagues.defaultProps = {
  user: {},
  results: {},
};

export default Leagues;
