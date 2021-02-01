import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './tables.css';
import {TableHead} from '@material-ui/core';

function getResults(results) {
  if (typeof results !== 'undefined') {
    return (
      <div>
        <TableContainer component={Paper} className='tableContainer'>
          <h1 className='h1'>Results</h1>
          <Table aria-label="customized table" className="table">
            <TableHead>
              <TableRow className="tableRowTitles">
                <TableCell align="center" height="auto" className='tableCell'>
                    Home Team
                </TableCell>
                <TableCell align="center" className='tableCell'>
                    Score
                </TableCell>
                <TableCell align="center" className='tableCell'>
                    Away Team
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='tableBody'>
              {results[2].map((item) => (
                <TableRow key={item.HomeTeam}>
                  <TableCell align="center" className='tableCell'>
                    {item.HomeTeam}
                  </TableCell>
                  <TableCell align="center" className='tableCell'>
                    {item.HomeScore} : {item.AwayScore}
                  </TableCell>
                  <TableCell align="center" className='tableCell'>
                    {item.AwayTeam}
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const PremierLeagueResults = ({
  results,
}) => {
  return (
    <div>
      {getResults(results['data'])}
    </div>
  );
};

PremierLeagueResults.propTypes = {
  results: PropTypes.object,
};

PremierLeagueResults.defaultProps = {
  results: {},
};

export default PremierLeagueResults;
