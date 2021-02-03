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
import '../homePage/tables.css';

const LeagueTable = ({
  table,
  openLeague,
}) => {
  return (
    <TableContainer component={Paper} className='tableContainer'>
      <h1 className='h1'>My Leagues</h1>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow style={{backgroundColor: "rgba(255,255,255,0.3)", color: "black"}}>
            <TableCell height="auto" align="left">League</TableCell>
            <TableCell align="center" >Status</TableCell>
            <TableCell align="center" >Pick</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{minHeight: 'auto', backgroundColor: "white", color: "black"}}>
          {table.map((item) => (
            <TableRow key={item[0]['LeagueID']}>
              <TableCell align='left'>
                <Link className="pointer" onClick={() => openLeague(item[0]['LeagueID'])} style={{paddingLeft: '15px'}}>{item[0]['LeagueID'].split('#')[0]}</Link>
              </TableCell>
              {(item[0]['playerStatus'] === 'In') ? (
                <TableCell align="center">
                  <img src={require('../../images/leagueStatusIn.png')} alt="logo" width="20px" style={{paddingTop:'3px'}}/>
                </TableCell>
                  ) : (
                  <TableCell align="left"><img src={require('../../images/leagueStatusOut.png')} alt="logo" width="20px" style={{paddingTop:'3px'}}/></TableCell>
                )}
              <TableCell align="center">{item[0]['CurrentPick']}</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LeagueTable.propTypes = {
  table: PropTypes.object,
  openLeague: PropTypes.func.isRequired,
};

LeagueTable.defaultProps = {
  table: {},
};

export default LeagueTable;
