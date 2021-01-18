import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function getResults(results) {
    if (typeof results !== 'undefined'){
        return (
            <TableContainer component={Paper} className='tableContainer'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="tableRowTitles">
                    <TableCell className='tableCell'>Home Team</TableCell>
                    <TableCell align="center" className='tableCell'>Score</TableCell>
                    <TableCell className='tableCell'>Away Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='tableBody'>
                {results[2].map((item) => (
                  <TableRow key={item.HomeTeam}>
                    <TableCell className='tableCell'>{item.HomeTeam}</TableCell>
                    <TableCell align="center" className='tableCell'>{item.HomeScore} : {item.AwayScore}</TableCell>
                    <TableCell className='tableCell'>{item.AwayTeam}</TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </TableContainer>
    )}
}

export default function PremierLeagueResults(props) {

    return (
        <div>
            <h1 align='center' style={{color: " white", paddingBottom: "2%"}}>Premier League Results</h1>
            {getResults(props.results["data"])}
        </div>
    )
}