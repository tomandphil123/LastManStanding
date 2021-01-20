import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PickTeam from './pickTeam';
import './individualLeagues.css';

export default function IndividualLeague(props) {

    return (
        typeof props.user !== 'undefined' ? (
        <div style={{backgroundColor: '#fff'}}>
            {console.log(props.user['data'])}
            <h1 align = "center">{props.user['data'][0]['LeagueID']} <Button color="primary" onClick={() => props.closeLeague()}><CloseIcon/></Button></h1>
            <TableContainer component={Paper} style={{ maxHeight: 820 }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                    <TableCell height="auto" align="center">Players</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Pick</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{minHeight: 'auto'}}>
            {props.user['data'].map((item) => (
                <TableRow key={item['Username']}>
                    <TableCell align='center'>{item['Username']}</TableCell>
                    {(item['Status'] === 'In') ? (
                        <TableCell align='right' ><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="20px"></img></TableCell>
                    ) : (
                        <TableCell align='right'><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="20px"></img></TableCell>
                    )}
                    <TableCell align='right'>N/A</TableCell>
                  </TableRow>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
            {props.user['data'].map((item) => (
                props.username === item['Username'] ? (
                    <PickTeam teams = {item['UnpickedTeams']} />
                ) : (
                    null
                )
            ))}
        </div>
    ) : (
        null
        )
    ) 
}