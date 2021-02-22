import React, {useState} from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import './adminSystem.css';

const AdminSystem = ({
  leagueStatus,
  leagueID,
  playerRemoval,
  leaguePlayerID,
}) => {
  const [lockLeague, setLockLeague] = useState(leagueStatus);

  const toggleLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'toggleLeague', leagueID: leagueID, lockLeague: lockLeague})
        .then((response) => {
          console.log(response);
          setLockLeague(!lockLeague);
        });
  };

  const deleteLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'deleteLeague', leagueID: leagueID})
        .then((response) => {
          console.log(response);
          alert(response['data']);
        });
  };

  const deleteUser = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'removePlayer', leaguePlayerID: leaguePlayerID})
      .then((response) => {
        console.log(response);
        alert(response['data']);
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
              <LockIcon style={{color: 'red'}}/>
            ) : (
              <LockOpenIcon style={{color: 'green'}}/>
            )}
          </Button>
        </Tooltip>
        <Tooltip title="Delete League" placement="top">
          <Button
            onClick={() => deleteLeague()}
            style={{backgroundColor: 'red'}}
          >
            <DeleteIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
      </div>
    )
  );
};

export default AdminSystem;
