/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import AdminSystem from '../adminSystem/adminSystem';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import axios from 'axios';
import '../tables/tables.css';
import './individualLeague.css';

const IndividualLeague = ({
  username,
  sub,
  leagueId,
  individualLeague,
  setIndividualLeague,
}) => {
  const [pick, setPick] = useState();
  const [permPick, setPermPick] = useState();
  const [leagueInfo, setLeagueInfo] = useState();
  const [render, setRender] = useState();
  const [pickButton, setPickButton] = useState(false)

  useEffect(() => {
    if (typeof leagueId !== undefined) {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getLeagueInfo', {leagueId: leagueId})
          .then((response) => {
            setLeagueInfo(response);
            // setIndividualLeague(!individualLeague);
          });
    }
  }, [leagueId, permPick, render]);

  return (
    individualLeague ? (
    <div style={{paddingTop: '30px'}}>
      <Card style={{boxShadow: '6px 8px 8px 8px rgb(162, 162, 163)', padding: '12px'}}>
        <div align='right'>
          <Button onClick={() => setIndividualLeague(false)}>
            <CloseIcon/>
          </Button>
        </div>
        <CardContent>
          { typeof leagueInfo !== 'undefined' ? (
            <div style={{backgroundColor: '#fff'}}>
              <Grid container direction='column' spacing={4}>
                <Grid item xs={12} md={12}>
                {leagueInfo['data'][1][0]['Winner'] !== '-' ? (
                        <Alert severity='success'>🏆 Winner Winner Chicken Dinner {leagueInfo['data'][1][0]['Winner']} 🏆</Alert>
                    ) : (
                      null
                    )}
                  {leagueInfo['data'][1][0]['LeagueStatus'] === 'Closed' ? (
                        <Alert severity='warning'>Matches in progress - Picks are disabled!</Alert>
                    ) : (
                      null
                    )}
                  {leagueInfo['data'][0].map((item) => (
                    <div key={item['Username']}>
                      {username === item['Username'] && item['playerStatus'] === 'Out' ? (
                        <Alert severity='error'>💩 You have been knocked out - try again next round! 💩</Alert>
                    ) : (
                      null
                    )}
                    </div>
                  ))}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TableContainer component={Paper} style={{maxHeight: 820}} className='tableContainer'>
                    <div style={{display: 'flex'}}>
                      <div>
                        <h1 style={{color: '#fff', padding: '10px', fontSize: '20px', fontWeight: 'bolder', textAlign: 'left'}}>
                          {leagueInfo['data'][1][0]['LeagueName']}
                        </h1>
                      </div>
                      <div style={{right: '90%', paddingTop: '3px', marginLeft: 'auto'}}>
                        {leagueInfo['data'][1][0]['admin'] === sub ? (
                        <AdminSystem leagueStatus={leagueInfo['data'][1][0]['Joinable'] === 'No' ? (true) : (false)} leagueID = {leagueId} setRender={setRender}/>
                        ) : (null)}
                      </div>
                    </div>
                    <Table aria-label='customized table'>
                      <TableHead>
                        <TableRow className="tableRowTitles">
                          <TableCell align='center' >Admin</TableCell>
                          <TableCell align='center' >Pick Status</TableCell>
                          <TableCell align='center' >Remaining</TableCell>
                          <TableCell align='center' >Eliminated</TableCell>
                          <TableCell align='center' >Invitation Code</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                        <TableRow>
                          <TableCell align='center' style={{paddingLeft: '10px'}}>{leagueInfo['data'][1][0]['fullName']}</TableCell>
                          {leagueInfo['data'][1][0]['LeagueStatus'] === 'Closed'? (
                            <TableCell align='center'>Locked</TableCell>
                          ) : (
                            <TableCell align='center'>Unlocked</TableCell>
                          )}
                          <TableCell align='center'>{leagueInfo['data'][1][0]['RemainingPlayers']}</TableCell>
                          <TableCell align='center'>{leagueInfo['data'][1][0]['EliminatedPlayers']}</TableCell>
                          <TableCell align='center'>{leagueInfo['data'][1][0]['invitationCode']}
                            <Button onClick={() => {
                              navigator.clipboard.writeText(leagueInfo['data'][1][0]['invitationCode']);
                            }} style={{padding: 0, minWidth: '36px'}}>
                              <FileCopyIcon className='copyToClipBoard'/>
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table>
                      <TableHead>
                        <TableRow className="tableRowTitles">
                          {leagueInfo['data'][1][0]['admin'] === sub ? (
                            <TableCell height='auto' align='left' style={{width: '25px'}}/>
                          ): (null)}
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
                            {leagueInfo['data'][1][0]['admin'] === sub ? (
                              item['Admin'] !== 'Yes'? (
                                <TableCell align='center'>
                                  <AdminSystem playerRemoval={true} leaguePlayerID={item['LeaguePlayerID']} setRender={setRender}/>
                                </TableCell>
                              ): (
                                <TableCell style={{height: '50px'}} align='center'/>
                              )
                            ) : (
                              null
                            )}
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
                <Grid item xs={12} md={12}>
                {console.log(pickButton)}
                  {leagueInfo['data'][0].map((item) => (
                    <div key={item['Username']}>
                      {username === item['Username'] && leagueInfo['data'][1][0]['LeagueStatus'] === 'Open' && item['playerStatus'] === 'In' ? (
                      
                      pickButton === false ? (
                        <Button onClick={() => setPickButton(!pickButton)}>Pick Team</Button>
                      ) : (
                        <>
                          <Button onClick={() => setPickButton(!pickButton)}>Close</Button>
                          <PickTeam teams = {item['UnpickedTeams']}  setPickButton = {setPickButton} setPick={setPick} sub={sub} leagueID={leagueInfo['data'][0][0]['LeagueID']} setPermPick={setPermPick}/>
                        </>
                      )
                    ) : (
                      null
                    )}
                    </div>
                  ))}
                </Grid>
              </Grid>
            </div>
        ) : (
          <div className="leagueLoading">
            <CircularProgress style={{color: '#490050'}}/>
          </div>
        )}
        </CardContent>
      </Card>
    </div>
    ) : (null)
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
