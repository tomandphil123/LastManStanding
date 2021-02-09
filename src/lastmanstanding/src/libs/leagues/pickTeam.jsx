/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const BootstrapButton = withStyles({
  root: {
    'boxShadow': 'none',
    'textTransform': 'none',
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'backgroundColor': '#37003c',
    'borderColor': '#ffff',
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#37003c',
      borderColor: '#37003c',
      boxShadow: '#37003c',
    },
    '&:active': {
      boxShadow: '0069d9',
      backgroundColor: '0069d9',
      borderColor: '0069d9',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.3rem rgba(1,255,190,.5)',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const PickTeam = ({
  setPick,
  sub,
  leagueID,
  teams,
  setPermPick,
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
      teams.map((item) => (
        <BootstrapButton key={item} variant="contained" color="primary" disableRipple className={classes.margin} onClick={() => selectTeam(item)}>
          {item}
        </BootstrapButton>
      )));
  };

  const submitTeam = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamSelection', {team: selectedTeam, sub: sub, leagueID: leagueID})
        .then((response) => {
          setPermPick({});
        });
  };

  return (
    <div>
      <div>
        {displayTeams(teams)}
      </div>
      <div>
        {submitToggle ? (
      <Button onClick={() => submitTeam()}>Select Team</Button>
      ) : (
        null
      )}
      </div>
    </div>
  );
};

PickTeam.propTypes = {
  setPick: PropTypes.func.isRequired,
  sub: PropTypes.string.isRequired,
  leagueID: PropTypes.string.isRequired,
  teams: PropTypes.string.isRequired,
  setPermPick: PropTypes.string.isRequired,
};

export default PickTeam;
