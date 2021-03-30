/* eslint-disable max-len */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import axios from 'axios';
import './adminSystem.css';

const AdminSystem = ({
  leagueStatus,
  leagueID,
  playerRemoval,
  leaguePlayerID,
  setRender,
}) => {
  const [lockLeague, setLockLeague] = useState(leagueStatus);

  const toggleLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'toggleLeague', leagueID: leagueID, lockLeague: lockLeague})
        .then((response) => {
          console.log(response);
          setLockLeague(!lockLeague);
          setRender({});
        });
  };

  const deleteLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'deleteLeague', leagueID: leagueID})
        .then((response) => {
          console.log(response);
          alert(response['data']);
          setRender({});
        });
  };

  const deleteUser = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'removePlayer', leaguePlayerID: leaguePlayerID})
        .then((response) => {
          console.log(response);
          alert(response['data']);
          setRender({});
        });
  };

  const resetLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'resetLeague', leagueID: leagueID})
        .then((response) => {
          console.log(response);
          alert(response['data']);
          setRender({});
        });
  };

  return (
    playerRemoval ? (
      <IconButton onClick={() => {
        if (window.confirm('Are you sure you want to remove this user from the league?')) deleteUser();
      }}>
        <DeleteIcon style={{color: 'red'}}/>
      </IconButton>
    ) : (
      <div>
        <Tooltip
          title={lockLeague ? ('Unlock League') : ('Lock League')}
          placement="top"
        >
          { lockLeague ? (
              <Button onClick={() => { if (window.confirm('Are you sure you want to unlock the league?')) toggleLeague() } }>
                <LockIcon style={{color: 'white'}}/>
              </Button>
            ) : (
              <Button onClick={() => { if (window.confirm('Are you sure you want to lock the league?')) toggleLeague() } }>
                <LockOpenIcon style={{color: 'white'}}/>
              </Button>
            )}
        </Tooltip>
        <Tooltip title="Reset League" placement="top">
          <Button onClick={() => { if (window.confirm('Are you sure you want to reset the league?')) resetLeague() } }>
            <RotateLeftIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
        <Tooltip title="Delete League" placement="top">
          <Button onClick={() => { if (window.confirm('Are you sure you want to delete the league?')) deleteLeague() } }>
            <DeleteIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
      </div>
    )
  );
};

AdminSystem.propTypes = {
  leagueStatus: PropTypes.bool.isRequired,
  leagueID: PropTypes.string.isRequired,
  playerRemoval: PropTypes.bool.isRequired,
  leaguePlayerID: PropTypes.string.isRequired,
  setRender: PropTypes.func.isRequired,
};

// AdminSystem.defaultProps = {
//   user: {},
//   results: {},
// };


export default AdminSystem;
