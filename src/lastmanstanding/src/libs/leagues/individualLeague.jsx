import React, {useState} from 'react';
import PropTypes from 'prop-types';
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


const IndividualLeague = ({
  user,
  closeLeague,
  username,
  sub,
}) => {
  const [pick, setPick] = useState();

  return (
        typeof user !== 'undefined' ? (
        <div style={{backgroundColor: '#fff'}}>
          <h1 align = "center">{user['data'][0]['LeagueID']}
            <Button color="primary" onClick={() => closeLeague()}>
              <CloseIcon/>
            </Button>
          </h1>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper} style={{maxHeight: 820}}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell height="auto" align="center">Status</TableCell>
                      <TableCell align="center">Pick</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{minHeight: 'auto'}}>
                    {user['data'].map((item) => (
                                username === item['Username'] ? (
                                <TableRow>
                                  <TableCell align='center'>
                                    {/* eslint-disable-next-line max-len */}
                                    <img src={require('../../images/leagueStatusIn.png')} alt="logo" width="20px"/>
                                  </TableCell>
                                  {typeof pick !== 'undefined' ? (
                                    <TableCell align='center'>{pick}</TableCell>
                                    ) : (
                                    item['CurrentPick'] !== '' ? (
                                      <TableCell align='center'>
                                        {item['CurrentPick']}
                                      </TableCell>
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
              {user['data'].map((item) => (
                username === item['Username'] ? (
                  // eslint-disable-next-line max-len
                  <PickTeam teams = {item['UnpickedTeams']} setPick={setPick} sub={sub} leagueID={user['data'][0]['LeagueID']}/>
            ) : (
                null
            )
              ))}
            </Grid>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper} style={{maxHeight: 820}}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell height="auto" align="center">
                        Players
                      </TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Pick</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{minHeight: 'auto'}}>
                    {user['data'].map((item) => (
                      <TableRow key={item['Username']}>
                        <TableCell align='center'>{item['Username']}</TableCell>
                        {(item['Status'] === 'In') ? (
                          <TableCell align='center' >
                            {/* eslint-disable-next-line max-len */}
                            <img src={require('../../images/leagueStatusIn.png')} alt="logo" width="20px"/>
                          </TableCell>
                          ) : (
                          <TableCell align='center'>
                            {/* eslint-disable-next-line max-len */}
                            <img src={require('../../images/leagueStatusIn.png')} alt="logo" width="20px"/>
                          </TableCell>
                          )}
                        <TableCell align='center'>
                          {item['CurrentPick']}
                        </TableCell>
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
  );
};

IndividualLeague.propTypes = {
  user: PropTypes.string.isRequired,
  closeLeague: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
};

export default IndividualLeague;
