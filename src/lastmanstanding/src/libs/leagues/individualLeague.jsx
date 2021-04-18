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
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../tables/tables.css';
import './individualLeague.css';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    overflow: 'scroll',
  },
}));

const IndividualLeague = ({
  username,
  sub,
  leagueId,
  individualLeague,
  setIndividualLeague,
  fixtures,
}) => {
  const classes = useStyles();
  const [pick, setPick] = useState();
  const [permPick, setPermPick] = useState();
  const [leagueInfo, setLeagueInfo] = useState();
  const [render, setRender] = useState();
  const [pickButton, setPickButton] = useState(false);
  const [previewButton, setPreviewButton] = useState(false);

  useEffect(() => {
    if (typeof leagueId !== undefined) {
      axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/getLeagueInfo', {leagueId: leagueId})
          .then((response) => {
            setLeagueInfo(response);
            console.log(response)
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
                  {leagueInfo['data'][1][0]['Winner'] !== '-' && typeof leagueInfo !== 'undefined' ? (
                        <Alert severity='success'><span role="img" aria-label="Trophy">🏆</span> Winner Winner Chicken Dinner {leagueInfo['data'][1][0]['Winner']} <span role="img" aria-label="Trophy">🏆</span></Alert>
                    ) : (
                      null
                    )}
                  {leagueInfo['data'][1][0]['LeagueStatus'] === 'Closed' && typeof leagueInfo !== 'undefined' ? (
                      <div className="lockedHeader">
                        <div className="leagueLockAlert">
                          <Alert severity='warning'>Matches in progress - Picks are disabled! </Alert>
                        </div>
                        {previewButton === true ? (
                          <>
                            <Backdrop className={classes.backdrop} open={previewButton}>
                              <Card className='pickTeamCard'>
                                  <CardContent>
                                  <div align='right'>
                                      <Button onClick={() => setPreviewButton(false)}>
                                      <CloseIcon/>
                                      </Button>
                                  </div>
                                    <TableContainer component={Paper} className='tableContainer'>
                                    <h1 className='h1'>Picks Preview</h1>
                                    <Table aria-label='customized table' className='table'>
                                      <TableHead>
                                        <TableRow className='tableRowTitles'>
                                          <TableCell align="center" className='tableCellProb'>
                                            Team
                                          </TableCell>
                                          <TableCell align="center" className='tableCellProb'>
                                            Picked
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      { leagueInfo['data'][2].map(item => (
                                        <>
                                          {item[0] !== 'Eliminated' ? (
                                            <TableBody className='tableBody' style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                                                <TableRow key={item}>
                                                  <TableCell align="center" className='tableCellProb'>
                                                  {item[0]}
                                                  </TableCell>
                                                  <TableCell align="center" className='tableCellProb'>
                                                  {item[1]}
                                                  </TableCell>
                                                </TableRow>
                                            </TableBody>
                                          ):(
                                            null
                                          )}
                                        </>
                                      ))}
                                    </Table>
                                  </TableContainer>
                                  </CardContent>
                              </Card>
                            </Backdrop>
                          </>
                        ) : (
                          <div className="previewPickButton">
                            <Button 
                              style={{backgroundColor: '#490050', color: '#fff', fontSize: "13px", height: "45px", fontWeight: "bold"}}
                              onClick={() => setPreviewButton(true)}
                              >
                                Picks Preview
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                        <Alert severity='warning'>Deadline for picks: {leagueInfo['data'][3]} </Alert>
                    )}
                  {leagueInfo['data'][0].map((item) => (
                    <div key={item['Username']}>
                      {username === item['Username'] && item['playerStatus'] === 'Out' ? (
                        <Alert severity='error'><span role="img" aria-label="Poo Emoji">💩</span> You have been knocked out - try again next round! <span role="img" aria-label="Poo Emoji">💩</span></Alert>
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
                          <TableCell align='center' >
                            {window.screen.width >= 550 ? (
                              <div>Remaining</div>
                            ) :(null)}
                          </TableCell>
                          <TableCell align='center'>
                            {window.screen.width >= 550 ? (
                              <div>Eliminated</div>
                            ) :(null)}
                          </TableCell>
                          {leagueInfo['data'][1][0]['admin'] === sub ? (
                            <TableCell align='center' >Invitation Code</TableCell>
                          ) : (null)}
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
                          <TableCell align='center'>
                            {window.screen.width >= 550 ? (
                                leagueInfo['data'][1][0]['RemainingPlayers']
                            ):( null)}
                          </TableCell>
                          <TableCell align='center'>
                            {window.screen.width >= 550 ? (
                                leagueInfo['data'][1][0]['EliminatedPlayers']
                            ):( null)}
                          </TableCell>
                          {leagueInfo['data'][1][0]['admin'] === sub ? (
                            <TableCell align='center'>{leagueInfo['data'][1][0]['invitationCode']}
                              <Button onClick={() => {
                                navigator.clipboard.writeText(leagueInfo['data'][1][0]['invitationCode']);
                              }} style={{padding: 0, minWidth: '36px'}}>
                                <FileCopyIcon className='copyToClipBoard'/>
                              </Button>
                            </TableCell>
                          ) : (null)}
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table>
                      <TableHead>
                        <TableRow className="tableRowTitles">
                          <TableCell align='center'>Status</TableCell>
                          <TableCell height='auto' align='left'>
                            Players
                          </TableCell>
                          <TableCell align='center'>Pick</TableCell>
                          {leagueInfo['data'][1][0]['admin'] === sub ? (
                            <TableCell height='auto' align='left' style={{width: '25px'}}/>
                          ): (null)}
                        </TableRow>
                      </TableHead>
                      <TableBody style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
                        {leagueInfo['data'][0].map((item) => (
                          <TableRow key={item['Username']}>
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
                            <TableCell align='left' style={{paddingLeft: '10px'}}>
                              <>
                                <div style={{fontWeight: 'bolder'}}>{item['fullName']}</div>
                                <div style={{fontSize: '12px'}}>{item['Username']}</div>
                              </>
                            </TableCell>
                            <TableCell align='center'>
                              {username === item['Username'] && leagueInfo['data'][1][0]['LeagueStatus'] === 'Open' && item['playerStatus'] === 'In' ? (
                              item['CurrentPick'] === 'Eliminated' ? (
                                item['CurrentPick']
                              ) : (
                                item['CurrentPick'] === '-' ? (
                                  <Button
                                    style={{backgroundColor: '#490050', height: '30px', color: '#fff', padding: '10px', fontWeight: 'bold'}}
                                    onClick={() => setPickButton(!pickButton)}
                                  >
                                      Pick Team
                                  </Button>
                                ) : (
                                  <>
                                    {item['CurrentPick']}
                                    <Button
                                      onClick={() => setPickButton(!pickButton)}
                                      className = 'updateButton'
                                    >
                                      <AddCircleOutlineIcon/>
                                    </Button>
                                  </>
                                )
                              )) : (item['CurrentPick'])}
                            </TableCell>
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={12}>
                  {leagueInfo['data'][0].map((item) => (
                    <div key={item['Username']}>
                      {pickButton === true && username === item['Username']? (
                        <>
                          <Backdrop className={classes.backdrop} open={pickButton}>
                            <Card className='pickTeamCard'>
                              <CardContent>
                                <div align='right'>
                                  <Button onClick={() => setPickButton(!pickButton)}>
                                    <CloseIcon/>
                                  </Button>
                                </div>
                                <PickTeam
                                  teams={item['UnpickedTeams']}
                                  setPickButton={setPickButton}
                                  setPick={setPick}
                                  pick={pick}
                                  sub={sub}
                                  leagueID={leagueInfo['data'][0][0]['LeagueID']}
                                  setPermPick={setPermPick}
                                  fixtures={fixtures}
                                />
                              </CardContent>
                            </Card>
                          </Backdrop>
                        </>
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
  fixtures: PropTypes.object.isRequired,
};

export default IndividualLeague;
