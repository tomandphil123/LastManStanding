import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function getStandings(results) {
    if (typeof results !== 'undefined'){
        return (
            <>
            <TableContainer component={Paper} style={{ maxHeight: 820 }}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center"> Position</TableCell>
                    <TableCell >Club</TableCell>
                    <TableCell align="center">MP</TableCell>
                    <TableCell align="center">W</TableCell>
                    <TableCell align="center">D</TableCell>
                    <TableCell align="center">L</TableCell>
                    <TableCell align="center">GD</TableCell>
                    <TableCell align="center">P</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results[0].map((item) => (
                  <TableRow key={item.TeamName}>
                    <TableCell ><img src={item.crestUrl} width='40' height='40' alt="teamlogo"/></TableCell>
                    <TableCell align="center">{item.position}</TableCell>
                    <TableCell className="hello">{item.TeamName}</TableCell>
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
        </>
    )}
}

export default function PremierLeagueStandings(props) {

  return (
        <div>
            <h1 align='center' style={{color: "white", paddingBottom: "2%"}}>Premier League Standings</h1>
            {getStandings(props.results["data"])}
        </div>
    )
}