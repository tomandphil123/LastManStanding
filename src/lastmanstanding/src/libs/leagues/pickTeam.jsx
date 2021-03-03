/* eslint-disable max-len */
import React, {useState} from 'react';
import SelectTeam from './selectTeam';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const BootstrapButton = withStyles({
  root: {
    'boxShadow': 'none',
    'textTransform': 'none',
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'backgroundColor': '#ffff',
    'color': '#490050',
    'borderColor': '#490050',
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
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
  margin: {
    margin: theme.spacing(1),
  },
}));

const PickTeam = ({
  setPick,
  setPickButton,
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
      <Grid container direction='column' spacing={1}>
        {teams.map((item) => (
            <BootstrapButton
              key={item}
              variant="contained"
              color='#490050'
              disableRipple
              className={classes.margin}
              onClick={() => selectTeam(item)}
              data-automation={item}
            >
              {item}
            </BootstrapButton>
        ))}
      </Grid>
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
