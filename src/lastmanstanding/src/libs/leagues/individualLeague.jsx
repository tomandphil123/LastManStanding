import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Container, Row, Col } from "shards-react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import './individualLeagues.css';

export default function IndividualLeague(props) {

    return (
        typeof props.user !== 'undefined' ? (
        <div style={{backgroundColor: '#fff'}}>
            {console.log(props.user['data'])}
            <h1 align = "center">{props.user['data'][0]['LeagueID']} <Button color="primary" onClick={() => props.closeLeague()}><CloseIcon/></Button></h1>
            {/* <Container>
                    <Row className="league-interaction-state-headers">
                        <Col sm="5" className="league-interaction-state-header">Status</Col>
                        <Col sm="7" className="league-interaction-state-header">Previous Weeks</Col>
                        <Col sm="3" className="league-interaction-state-header">This Week</Col>
                    </Row> */}
            <TableContainer component={Paper} style={{ maxHeight: 820 }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                    <TableCell height="auto" align="centre">Players</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Pick</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{minHeight: 'auto'}}>
            {props.user['data'].map((item) => (
                // <div>
                //     {/* <h1>{item['Username']}</h1>
                //     <h3>{item['Status']}</h3>
                //     {props.username === item['Username'] && item['Admin'] === 'Yes' ? (
                //         <h1>Admin: {props.username}</h1>
                //     ) : (
                //         null
                //     )} */}
                // </div>
                <TableRow key={item['Username']}>
                    <TableCell align='left'>{item['Username']}</TableCell>
                    {(item['Status'] === 'In') ? (
                        <TableCell align="right" ><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="12px"></img></TableCell>
                    ) : (
                        <TableCell align="right"><img src={require("../../images/leagueStatusIn.png")} alt="logo" width="12px"></img></TableCell>
                    )}
                    <TableCell align="right">N/A</TableCell>
                  </TableRow>
            //     <Row className="league-interaction-state-items">
            //     <Col sm="2" className="league-interaction-state-item">
            //       <h1>{item['Username']}</h1>
            //     </Col>
            //     <Col sm="7" className="league-interaction-state-item"><h3>{item['Status']}</h3></Col>
            //     <Col sm="3" className="league-interaction-state-item">N/A</Col>
            //   </Row>
            ))}
            </TableBody>
            </Table>
            </TableContainer>
            {/* </Container> */}
        </div>
    ) : (
        null
        )
    ) 
}