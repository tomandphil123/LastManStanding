/* eslint-disable max-len */
import React, {useState} from 'react';
import SelectTeam from './selectTeam';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import './pickTeam.css';

const BootstrapButton = withStyles({
  root: {
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'backgroundColor': '#ffff',
    'color': '#490050',
    'borderColor': '#490050',
    '&:hover': {
      backgroundColor: '#490050',
      color: '#ffff',
      borderColor: '#490050',
      boxShadow: '#490050',
    },
    '&:active': {
      color: '#ffff',
      backgroundColor: '#490050',
      borderColor: '#490050',
    },
    '&:focus': {
      color: '#ffff',
      borderColor: '#490050',
      backgroundColor: '#490050',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  margin:{
    height:'26px',
    fontSize: '13px'
  }
}));

const PickTeam = ({
  setPick,
  setPickButton,
  sub,
  leagueID,
  teams,
  setPermPick,
  fixtures,
}) => {
  const classes = useStyles();

  const [selectedTeam, setSelectedTeam] = useState();
  const [submitToggle, setSubmitToggle] = useState(false);

  const selectTeam = (team) => {
    setSelectedTeam(team);
    setPick(team);
    setSubmitToggle(true);
  };

  const displayTeams = (teams) => {
    return (
      <>
        <TableContainer component={Paper} className='tableContainer'>
          <h1 className='h1'>Pick Team</h1>
          <Table aria-label='customized table' className='table'>
            <TableHead>
              <TableRow className='tableRowTitles'>
                <TableCell align='center' height='auto' className='tableCell'>
                  <h1>Home Team</h1>
                </TableCell>
                <TableCell align='center' className='tableCellCrest'/>
                <TableCell align='center' className='tableCellCrest'>VS</TableCell>
                <TableCell align='center' className='tableCellCrest'/>
                <TableCell align='center' className='tableCell'>
                  <h1>Away Team</h1>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='tableBody' style={{minHeight: 'auto', backgroundColor: 'white', color: 'black'}}>
              {fixtures['data'][1].map((item) => (
                <TableRow key={item.HomeTeam}>
                  <TableCell align='center' className='tableCell'>
                    {teams.includes(item.HomeTeam) ? (
                    <BootstrapButton
                      key={item}
                      variant='contained'
                      disableRipple
                      className={classes.margin}
                      onClick={() => selectTeam(item.HomeTeam)}
                      data-automation={item.HomeTeam}
                    >
                      {window.screen.width <= 650 ? (
                        <img src={item['HomeTeamCrest']} alt= 'team crests' height='22px'/>
                      ) : (
                        item.HomeTeam
                    )}
                    </BootstrapButton>
                  ) : (
                    window.screen.width <= 650 ? (
                      <img src={item['HomeTeamCrest']} alt= 'team crests' height='22px'/>
                    ) : (
                      item.HomeTeam
                  ))}
                  </TableCell>
                  <TableCell align='center' className='tableCellCrest'>
                    {window.screen.width <= 650 ? (
                        null
                      ) : (
                        <img src={item['HomeTeamCrest']} alt= 'team crests' height='22px'/>
                    )}
                  </TableCell>
                  <TableCell align='center' className='tableCell'>VS</TableCell>
                  <TableCell align='center' className='tableCellCrest'>
                    {window.screen.width <= 650 ? (
                        null
                      ) : (
                        <img src={item['AwayTeamCrest']} alt= 'team crests' height='22px'/>
                    )}
                  </TableCell>
                  <TableCell align='center' className='tableCell'>
                    {teams.includes(item.AwayTeam) ? (
                    <BootstrapButton
                      key={item}
                      variant='contained'
                      disableRipple
                      className={classes.margin}
                      onClick={() => selectTeam(item.AwayTeam)}
                      data-automation={item.AwayTeam}
                    >
                      {window.screen.width <= 650 ? (
                        <img src={item['AwayTeamCrest']} alt= 'team crests' height='22px'/>
                      ) : (
                        item.AwayTeam
                    )}
                    </BootstrapButton>
                  ) : (
                    window.screen.width <= 650 ? (
                      <img src={item['AwayTeamCrest']} alt= 'team crests' height='22px'/>
                    ) : (
                      item.AwayTeam
                  ))}
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };


  return (
    <div>
      <div>
        {displayTeams(teams)}
      </div>
      <div>
        <SelectTeam
          submitToggle={submitToggle}
          selectedTeam={selectedTeam}
          sub={sub}
          leagueID={leagueID}
          setPickButton={setPickButton}
          setPermPick={setPermPick}
        />
      </div>
    </div>
  );
};

PickTeam.propTypes = {
  setPick: PropTypes.func.isRequired,
  sub: PropTypes.string.isRequired,
  leagueID: PropTypes.string.isRequired,
  teams: PropTypes.array.isRequired,
  setPermPick: PropTypes.func.isRequired,
};

export default PickTeam;
