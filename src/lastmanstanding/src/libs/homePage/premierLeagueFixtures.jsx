import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './tables.css'

function getFixtures(results) {
    if (typeof results !== 'undefined'){
        return (
            <TableContainer component={Paper} className='tableContainer'>
            <Table aria-label="customized table" className="table">
              <TableHead>
              </TableHead>
                <TableRow className="tableRowTitles">
                    <TableCell align="center" height="auto" className='tableCell'><h1>Home Team</h1></TableCell>
                    <TableCell align="center" className='tableCell'>VS</TableCell>
                    <TableCell align="center" className='tableCell'><h1>Away Team</h1></TableCell>
                </TableRow>
              
              <TableBody className='tableBody'>
                {results[1].map((item) => (
                  <TableRow key={item.HomeTeam}>
                    <TableCell align="center" className='tableCell'>{item.HomeTeam}</TableCell>
                    <TableCell align="center" className='tableCell'>VS</TableCell>
                    <TableCell align="center" className='tableCell'>{item.AwayTeam}</TableCell>
                  </TableRow>))}
                
              </TableBody>
            </Table>
          </TableContainer>
    )}
}

export default function PremierLeagueFixtures(props) {

    return (
        <div>
            <h1 align='center' style={{color: " white", paddingBottom: "2%"}}>Premier League Fixtures</h1>
            {getFixtures(props.results["data"])}
        </div>
    )
}