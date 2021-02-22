import React, {useState} from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import './adminSystem.css';

const AdminSystem = ({
  leagueStatus,
  leagueID
}) => {
  const [lockLeague, setLockLeague] = useState(leagueStatus);

  const toggleLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'toggleLeague', leagueID: leagueID, lockLeague: lockLeague})
    .then((response) => {
      console.log(response);
      setLockLeague(!lockLeague);
      alert(response['data']);
    });
  };

  const deleteLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'deleteLeague', leagueID: leagueID})
          .then((response) => {
            console.log(response);
            alert(response['data']);
          });
  };

  return (
    <div>
      <Tooltip title={lockLeague ? ('Unlock League') : ('Lock League')} placement="top">
        <Button onClick={() => toggleLeague()}>
        { lockLeague ? (
          <LockIcon style={{color: 'red'}}/>
        ) : (
          <LockOpenIcon style={{color: 'green'}}/>
        )}
        </Button>
      </Tooltip>
      <Tooltip title="Delete League" placement="top">
        <Button onClick={() => deleteLeague()} style={{backgroundColor: 'red'}}>
          <DeleteIcon style={{color: '#ffffff'}}/>
        </Button>
      </Tooltip>
    </div>
  );
};

export default AdminSystem;
