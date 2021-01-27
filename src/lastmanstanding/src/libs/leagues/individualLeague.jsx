import React, {useState} from 'react';
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
import Grid from '@material-ui/core/Grid';


export default function IndividualLeague(props) {

    const [pick, setPick] = useState();

    console.log(props.user)
    console.log(props.username)

    return (
        typeof props.user !== 'undefined' ? (
        <div style={{backgroundColor: '#fff'}}>
            <h1 align = "center">{props.user['data'][0]['LeagueID']} <Button color="primary" onClick={() => props.closeLeague()}><CloseIcon/></Button></h1>
            <Grid container direction="column" spacing={4}>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} style={{ maxHeight: 820 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell height="auto" align="center">Status</TableCell>
                                    <TableCell align="center">Pick</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{minHeight: 'auto'}}>
                            {props.user['data'].map((item) => (
                                props.username === item['Username'] ? (
                                <TableRow>
                                    <TableCell align='center'><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="20px"></img></TableCell>
                                    {typeof pick !== 'undefined' ? (
                                        <TableCell align='center'>{pick}</TableCell>
                                    ) : (
                                    item['CurrentPick'] !== '' ? (
                                        <TableCell align='center'>{item['CurrentPick']}</TableCell>
                                    ) : (
                                        <TableCell align='center'>-</TableCell>
                                        )
                                    )}
                                </TableRow>
                                ) : (
                                    null
                                )))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            {props.user['data'].map((item) => (
            props.username === item['Username'] ? (
                <PickTeam teams = {item['UnpickedTeams']} setPick={setPick} sub={props.sub} leagueID={props.user['data'][0]['LeagueID']}/>
            ) : (
                null
            )
            ))}
                </Grid>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper} style={{ maxHeight: 820 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell height="auto" align="center">Players</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Pick</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{minHeight: 'auto'}}>
                            {props.user['data'].map((item) => (
                                <TableRow key={item['Username']}>
                                    <TableCell align='center'>{item['Username']}</TableCell>
                                    {(item['Status'] === 'In') ? (
                                        <TableCell align='center' ><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="20px"></img></TableCell>
                                    ) : (
                                        <TableCell align='center'><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="20px"></img></TableCell>
                                    )}
                                    <TableCell align='center'>{item['CurrentPick']}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    ) : (
        null
        )
    ) 
}