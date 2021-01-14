import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function getFixtures(results) {
    if (typeof results !== 'undefined'){
        return (
            <TableContainer component={Paper} style={{ maxHeight: 820 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell height="auto">Home Team</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Away Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results[1].map((item) => (
                  <TableRow key={item.HomeTeam}>
                    <TableCell >{item.HomeTeam}</TableCell>
                    <TableCell >VS</TableCell>
                    <TableCell >{item.AwayTeam}</TableCell>
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