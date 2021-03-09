import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import PickTeam from './pickTeam';


const SelectTeam = ({
  submitToggle,
  selectedTeam,
  sub,
  leagueID,
  setPermPick,
  setPickButton
}) => {
  const submitTeam = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamSelection', {team: selectedTeam, sub: sub, leagueID: leagueID})
        .then(() => {
          setPermPick({});
          setPickButton(!PickTeam);
        });
  };

  return (
    submitToggle ? (
      <Button
        onClick={() => submitTeam()}
        data-automation='pickTeam_submitButton'
        style={{backgroundColor: '#490050', height:'30px', color: '#fff', padding:'10px', fontWeight: 'bold', marginTop: '10px'}}
      >
        Select Team
      </Button>
      ) : (
          null
      ));
};

SelectTeam.propTypes = {
  submitToggle: PropTypes.bool.isRequired,
  selectedTeam: PropTypes.string,
  sub: PropTypes.string.isRequired,
  leagueID: PropTypes.string.isRequired,
  setPermPick: PropTypes.func.isRequired,
};

SelectTeam.defaultProps = {
  selectedTeam: '',
};

export default SelectTeam;
