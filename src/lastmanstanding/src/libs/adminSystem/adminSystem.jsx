import React, {useState} from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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
    });
  };

  const deleteLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'deleteLeague', leagueID: leagueID})
          .then((response) => {
            console.log(response);
          });
  };

  return (
    <div>
        <button onClick={() => toggleLeague()}>
        { lockLeague ? (
          <LockIcon/>
        ) : (
          <LockOpenIcon/>
        )}
        </button>
        <button onClick={() => deleteLeague()}>
          <DeleteIcon/>
        </button>
    </div>
  );
};

export default AdminSystem;
