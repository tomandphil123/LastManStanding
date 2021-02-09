/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import '../tables/tables.css';

const IndividualLeague = ({
  username,
  sub,
  leagueId,
  setIndividualLeague,
  individualLeague,
}) => {
  const [pick, setPick] = useState();
  const [permPick, setPermPick] = useState();
  const [leagueInfo, setLeagueInfo] = useState();

  useEffect(() => {
    console.log(leagueId);
    if (typeof leagueId !== undefined) {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getLeagueInfo', {leagueId: leagueId})
          .then((response) => {
            setLeagueInfo(response);
            setIndividualLeague(!individualLeague);
          });
    }
  }, [leagueId, permPick]);

  return (
        typeof leagueInfo !== 'undefined' ? (
        <div style={{backgroundColor: '#fff', paddingTop: '20px'}}>
          <Grid container direction='column' spacing={4}>
            <Grid item xs={12} md={12}>
              <TableContainer component={Paper} style={{maxHeight: 820}} className='tableContainer'>
                <h1 style={{color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center'}}> {leagueInfo['data'][1][0]['LeagueName']}
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
                      <TableCell align='center' style={{paddingLeft: '10px'}}>{leagueInfo['data'][1][0]['fullName']}</TableCell>
                      {leagueInfo['data'][1][0]['LeagueStatus'] === 'Closed' ? (
                        <TableCell align='center'>Locked</TableCell>
                      ) : (
                        <TableCell align='center'>Unlocked</TableCell>
                      )}
                      <TableCell align='center'>3</TableCell>
                      <TableCell align='center'>0</TableCell>
                      <TableCell align='center'>{leagueInfo['data'][1][0]['invitationCode']}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={12}>
              {leagueInfo['data'][1][0]['LeagueStatus'] === 'Closed' ? (
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
                    {leagueInfo['data'][0].map((item) => (
                      username === item['Username'] ? (
                      <TableRow>
                        { item['playerStatus'] === 'In' ? (
                          <TableCell align='center' >
                            <img src={require('../../images/leagueStatusIn.png')} alt='logo' width='20px' style={{paddingTop: '3px'}}/>
                          </TableCell>
                        ) : (
                          <TableCell align='center'>
                            <img src={require('../../images/leagueStatusOut.png')} alt='logo' width='20px' style={{paddingTop: '3px'}}/>
                          </TableCell>
                        )}
                        {typeof pick !== 'undefined' ? (
                          <TableCell align='center'>{pick}</TableCell>
                          ) : (
                            <TableCell align='center'>
                              {item['CurrentPick']}
                            </TableCell>
                          )}
                      </TableRow>
                      ) : (
                          null
                      )))}
                  </TableBody>
                </Table>
              </TableContainer>
              {leagueInfo['data'][0].map((item) => (
                <div key={item['Username']}>
                  {username === item['Username'] && leagueInfo['data'][1][0]['LeagueStatus'] === 'Open' && item['playerStatus'] === 'In' ? (
                  // eslint-disable-next-line max-len
                  <PickTeam teams = {item['UnpickedTeams']} setPick={setPick} sub={sub} leagueID={leagueInfo['data'][0][0]['LeagueID']} setPermPick={setPermPick}/>
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
                <h1 style={{color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'center'}}>League Table</h1>
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
                    {leagueInfo['data'][0].map((item) => (
                      <TableRow key={item['Username']}>
                        <TableCell align='left' style={{paddingLeft: '10px'}}>
                          <>
                            <div style={{fontWeight: 'bolder'}}>{item['fullName']}</div>
                            <div style={{fontSize: '12px'}}>{item['Username']}</div>
                          </>
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
  leagueInfo: PropTypes.object,
  closeLeague: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  leagueId: PropTypes.string.isRequired,
  setIndividualLeague: PropTypes.func.isRequired,
  individualLeague: PropTypes.bool.isRequired,
};

export default IndividualLeague;
