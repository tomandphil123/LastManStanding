import React, {useState} from 'react';
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
      <IconButton
        aria-label="delete"
        onClick={() => deleteUser()}
      >
        <DeleteIcon style={{color: 'red'}}/>
      </IconButton>
    ) : (
      <div>
        <Tooltip
          title={lockLeague ? ('Unlock League') : ('Lock League')}
          placement="top"
        >
          <Button onClick={() => toggleLeague()}>
            { lockLeague ? (
              <LockIcon style={{color: 'white'}}/>
            ) : (
              <LockOpenIcon style={{color: 'white'}}/>
            )}
          </Button>
        </Tooltip>
        <Tooltip title="Reset League" placement="top">
          <Button
            onClick={() => resetLeague()}
          >
            <RotateLeftIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
        <Tooltip title="Delete League" placement="top">
          <Button
            onClick={() => deleteLeague()}
          >
            <DeleteIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
      </div>
    )
  );
};

export default AdminSystem;
