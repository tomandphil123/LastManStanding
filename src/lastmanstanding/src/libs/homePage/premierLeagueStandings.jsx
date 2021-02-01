import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './tables.css';

const getStandings = (results) => {
  if (typeof results !== 'undefined') {
    return (
      <div>
        <TableContainer component={Paper} className='tableContainer'>
          <h1 className='h1'>Standings</h1>
          <Table aria-label="simple table" className="table">
            <TableHead>
              <TableRow className="tableRowTitles">
                <TableCell></TableCell>
                <TableCell align="center">Pos</TableCell>
                <TableCell>Club</TableCell>
                <TableCell></TableCell>
                <TableCell align="center" >MP</TableCell>
                <TableCell align="center" >W</TableCell>
                <TableCell align="center" >D</TableCell>
                <TableCell align="center" >L</TableCell>
                <TableCell align="center" >GD</TableCell>
                <TableCell align="center" >P</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results[0].map((item) => (
                <TableRow key={item.TeamName}>
                  <TableCell align="center">
                    <img src={item.crestUrl} height='30' alt="teamlogo"/>
                  </TableCell>
                  <TableCell align="center">{item.position}</TableCell>
                  <TableCell width="80">{item.TeamName}</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">{item.gamesPlayed}</TableCell>
                  <TableCell align="center">{item.won}</TableCell>
                  <TableCell align="center">{item.draw}</TableCell>
                  <TableCell align="center">{item.lost}</TableCell>
                  <TableCell align="center">{item.goalDifference}</TableCell>
                  <TableCell align="center">{item.points}</TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

const PremierLeagueStandings = ({
  results,
}) => {
  return (
    <div>
      {getStandings(results['data'])}
    </div>
  );
};

PremierLeagueStandings.propTypes = {
  results: PropTypes.object,
};

PremierLeagueStandings.defaultProps = {
  results: {},
};

export default PremierLeagueStandings;
