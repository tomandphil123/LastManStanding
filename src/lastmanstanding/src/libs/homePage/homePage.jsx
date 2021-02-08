import React from 'react';
import PropTypes from 'prop-types';
import PremierLeagueStandings from '../tables/premierLeagueStandings';
import PremierLeagueFixtures from '../tables/premierLeagueFixtures';
import PremierLeagueResults from '../tables/premierLeagueResults';
import Grid from '@material-ui/core/Grid';


const HomePage = ({
  results,
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

HomePage.propTypes = {
  results: PropTypes.object,
};

HomePage.defaultProps = {
  results: {},
};

export default HomePage;
