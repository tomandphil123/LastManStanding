import React, {useState} from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const AdminSystem = ({
  leagueStatus,
}) => {
  const [lockLeague, setLockLeague] = useState(leagueStatus);

  const toggleLeague = () => {
    setLockLeague(!lockLeague);
    console.log(lockLeague);
  };

  return (
    <div>
      { lockLeague ? (
        <button onClick={() => toggleLeague()}>
          <LockIcon/>
        </button>
      ) : (
        <button onClick={() => toggleLeague()}>
          <LockOpenIcon/>
        </button>
      )}
    </div>
  );
};

export default AdminSystem;
