/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PickTeam from './pickTeam';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import '../homePage/tables.css';

const IndividualLeague = ({
  user,
  closeLeague,
  username,
  sub,
}) => {
  const [pick, setPick] = useState();
  return (
        typeof user !== 'undefined' ? (
        <div style={{backgroundColor: '#fff', paddingTop: '20px'}}
          className='box'>
          <Grid container direction='column' spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper} style={{maxHeight: 820}} className='tableContainer'>
                <h1 style={{color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center'}}> {user['data'][1][0]['LeagueName']}
                  {/* <Button color='primary' onClick={() => closeLeague()}>
                    <HighlightOffIcon/>
                  </Button> */}
                </h1>
                <Table aria-label='customized table'>
                  <TableHead>
                    <TableRow className="tableRowTitles">
                      <TableCell align='center' >Admin</TableCell>
                      <TableCell align='center' >League Status</TableCell>
                      <TableCell align='center' >Remaining Players</TableCell>
                      <TableCell align='center' >Players Eliminated</TableCell>
                      <TableCell align='center' >Invitation Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                    <TableRow>
                      <TableCell align='center' style={{paddingLeft: '10px'}}>{user['data'][1][0]['fullName']}</TableCell>
                      {user['data'][1][0]['LeagueStatus'] === 'Closed' ? (
                        <TableCell align='center'>Locked</TableCell>
                      ) : (
                        <TableCell align='center'>Unlocked</TableCell>
                      )}
                      <TableCell align='center'>3</TableCell>
                      <TableCell align='center'>0</TableCell>
                      <TableCell align='center'>{user['data'][1][0]['invitationCode']}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12}>
              {user['data'][1][0]['LeagueStatus'] === 'Closed' ? (
                    <Alert severity='warning'>Matches in progress - Picks are disabled!</Alert>
                ) : (
                  null
                )}
              <TableContainer component={Paper} style={{maxHeight: 820}} className='tableContainer'>
                <h1 style={{color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center'}}>Your Stats</h1>
                <Table aria-label='customized table'>
                  <TableHead>
                    <TableRow className="tableRowTitles">
                      <TableCell align='center'>Status</TableCell>
                      <TableCell align='center'>Pick</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                    {user['data'][0].map((item) => (
                      username === item['Username'] ? (
                      <TableRow>
                        { item['playerStatus'] === 'In' ? (
                          <TableCell align='center' >
                            <img src={require('../../images/leagueStatusIn.png')} alt='logo' width='20px' style={{paddingTop:'3px'}}/>
                          </TableCell>
                        ) : (
                          <TableCell align='center'>
                            <img src={require('../../images/leagueStatusOut.png')} alt='logo' width='20px' style={{paddingTop:'3px'}}/>
                          </TableCell>
                        )}
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
              {user['data'][0].map((item) => (
                <div key={item['Username']}>
                  {username === item['Username'] && user['data'][1][0]['LeagueStatus'] === 'Open' && item['playerStatus'] === 'In' ? (
                  // eslint-disable-next-line max-len
                  <PickTeam teams = {item['UnpickedTeams']} setPick={setPick} sub={sub} leagueID={user['data'][0][0]['LeagueID']}/>
                ) : (
                    null
                )}
                  {username === item['Username'] && item['playerStatus'] === 'Out' ? (
                    <Alert severity='error'>You have been knocked out - try again next round!</Alert>
                ) : (
                  null
                )}
                </div>
              ))}
            </Grid>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper} style={{maxHeight: 820}} className='tableContainer'>
                <h1 style={{ color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center'}}>League Table</h1>
                <Table aria-label='customized table'>
                  <TableHead>
                    <TableRow className="tableRowTitles">
                      <TableCell height='auto' align='left'>
                        Players
                      </TableCell>
                      <TableCell align='center'>Status</TableCell>
                      <TableCell align='center'>Pick</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                    {user['data'][0].map((item) => (
                      <TableRow key={item['Username']}>
                        <TableCell align='left' style={{paddingLeft: '10px'}}>
                          <div verticalAlign='center'>
                            <div style={{fontWeight: 'bolder'}}>{item['fullName']}</div>
                            <div style={{fontSize: '12px'}}>{item['Username']}</div>
                          </div>
                        </TableCell>
                        {(item['playerStatus'] === 'In') ? (
                          <TableCell align='center' >
                            {/* eslint-disable-next-line max-len */}
                            <img src={require('../../images/leagueStatusIn.png')} alt='logo' width='20px' style={{paddingTop: '3px'}}/>
                          </TableCell>
                          ) : (
                          <TableCell align='center'>
                            <img src={require('../../images/leagueStatusOut.png')} alt='logo' width='20px' style={{paddingTop: '3px'}}/>
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
