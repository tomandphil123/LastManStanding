/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import '../tables/tables.css';

const LeagueTable = ({
  table,
  setLeagueId,
  setIndividualLeague,
  individualLeague,
}) => {
  return (
    <TableContainer component={Paper} className='tableContainer'>
      <h1 className='h1'>My Leagues</h1>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{backgroundColor: 'rgba(255,255,255,0.3)', color: 'black'}}>
            <TableCell height="auto" align="left">League</TableCell>
            <TableCell align="center" >Status</TableCell>
            <TableCell align="center" >Pick</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
          {table.map((item) => (
            <TableRow key={item[0]['LeagueID']}>
              <TableCell align='left' style={{paddingLeft: '12px'}}>
                <Link className="pointer" onClick={() => {
                  setLeagueId(item[0]['LeagueID']); setIndividualLeague(true);
                }}>
                  <>
                    <div style={{fontWeight: 'bolder'}}>{item[0]['LeagueID'].split('#')[0]}</div>
                    <div style={{fontSize: '12px'}}>#{item[0]['LeagueID'].split('#')[1]}</div>
                  </>
                </Link>
              </TableCell>
              {(item[0]['playerStatus'] === 'In') ? (
                <TableCell align="center">
                  <img src={require('../../images/leagueStatusIn.png')} alt="logo" width="20px" style={{paddingTop: '3px'}}/>
                </TableCell>
                  ) : (
                  <TableCell align="center"><img src={require('../../images/leagueStatusOut.png')} alt="logo" width="20px" style={{paddingTop: '3px'}}/></TableCell>
                )}
              <TableCell align="center">{item[0]['CurrentPick']}</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LeagueTable.propTypes = {
  table: PropTypes.array,
  setLeagueId: PropTypes.func.isRequired,
  setIndividualLeague: PropTypes.func,
  individualLeague: PropTypes.string.isRequired,
};

LeagueTable.defaultProps = {
  table: {},
};

export default LeagueTable;
