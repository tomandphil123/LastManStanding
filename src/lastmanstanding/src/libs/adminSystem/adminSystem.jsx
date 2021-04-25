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
import alertify from 'alertifyjs';
import './adminSystem.css';

const AdminSystem = ({
  leagueStatus,
  leagueID,
  playerRemoval,
  leaguePlayerID,
  setRender,
  setIndividualLeague,
  setIndividualRender
}) => {
  const [lockLeague, setLockLeague] = useState(leagueStatus);

  const toggleLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'toggleLeague', leagueID: leagueID, lockLeague: lockLeague})
        .then((response) => {
          alertify.set('notifier','position', 'top-center');
          alertify.success(response['data']);
          setLockLeague(!lockLeague);
          setIndividualRender({});
        });
  };

  const deleteLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'deleteLeague', leagueID: leagueID})
        .then((response) => {
          setRender({});
          setIndividualLeague(false);
          alertify.set('notifier','position', 'top-center');
          alertify.success(response['data']);
        });
  };

  const deleteUser = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'removePlayer', leaguePlayerID: leaguePlayerID})
        .then((response) => {
          setIndividualRender({});
          alertify.set('notifier','position', 'top-center');
          alertify.success(response['data']);
        });
  };

  const resetLeague = () => {
    axios.post('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/adminActions', {flag: 'resetLeague', leagueID: leagueID})
        .then((response) => {
          setIndividualRender({});
          alertify.set('notifier','position', 'top-center');
          alertify.success(response['data']);
        });
  };

  return (
    playerRemoval ? (
      <IconButton onClick={() => {
        if (alertify.confirm('Attention!','Are you sure you want to remove this user from the league?')) {deleteUser()};
      }}
      data-automation="removePlayer"
      >
        <DeleteIcon style={{color: 'red'}}/>
      </IconButton>
    ) : (
      <div>
        <Tooltip
          title={lockLeague ? ('Unlock League') : ('Lock League')}
          placement="top"
        >
          { lockLeague ? (
              <Button onClick={() => {
                  if (alertify.confirm('Attention!','Are you sure you want to unlock the league?', toggleLeague(), function(){})); 
                }} 
                data-automation="unlockLeague">
                <LockIcon style={{color: 'white'}}/>
              </Button>
            ) : (
              <Button onClick={() => {
                  if (alertify.confirm('Attention!','Are you sure you want to lock the league?',toggleLeague(), function(){})); 
                }}
                data-automation="lockLeague">
                <LockOpenIcon style={{color: 'white'}}/>
              </Button>
            )}
        </Tooltip>
        <Tooltip title="Reset League" placement="top">
          <Button onClick={() => {
              if (alertify.confirm('Attention!','Are you sure you want to reset the league?', resetLeague(), function(){})); 
            }}
            data-automation="ResetLeague">
            <RotateLeftIcon style={{color: '#ffffff'}}/>
          </Button>
        </Tooltip>
        <Tooltip title="Delete League" placement="top">
          <Button onClick={() => {
              if (alertify.confirm('Attention!','Are you sure you want to delete the league?', deleteLeague(), function(){})); 
            }}
            data-automation="DeleteLeague">
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
  setIndividualLeague: PropTypes.func.isRequired
};


export default AdminSystem;
