import React from 'react';
import PropTypes from 'prop-types';
import PremierLeagueStandings from './premierLeagueStandings';
import PremierLeagueFixtures from './premierLeagueFixtures';
import PremierLeagueResults from './premierLeagueResults';
import Grid from '@material-ui/core/Grid';


const LoggedInHomePage = ({
  results
}) => {
  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={8}>
          <PremierLeagueStandings results={results}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid item xs={12} style={{marginBottom: '20px'}}>
            <PremierLeagueFixtures results={results}/>
          </Grid>
          <Grid item xs={12}>
            <PremierLeagueResults results={results}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

LoggedInHomePage.propTypes = {
  results: PropTypes.object,
};

LoggedInHomePage.defaultProps = {
  results: {},
};

export default LoggedInHomePage;
