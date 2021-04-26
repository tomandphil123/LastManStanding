import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const UserInfo = ({
  myInfo,
  setmyTeam,
}) => {

  const teams = {
    'Arsenal FC': 'arsenal',
    'Aston Villa FC': 'astonvilla',
    'Brighton & Hove Albion FC': 'brightonandhovealbion',
    'Burnley FC': 'burnley',
    'Chelsea FC': 'chelsea',
    'Crystal Palace FC': 'crystalpalace',
    'Everton FC': 'everton',
    'Fulham FC' : 'fulham',
    'Leeds United FC': 'leedsunited',
    'Leicester City FC': 'leicestercity',
    'Liverpool FC': 'liverpool',
    'Manchester City FC': 'manchestercity',
    'Manchester United FC': 'manchesterunited',
    'Newcastle United FC': 'newcastleunited',
    'Sheffield United FC': 'sheffieldunited',
    'Southampton FC': 'southampton',
    'Totenham Hotspur FC': 'totenhamhotspur',
    'West Bromwich Albion FC': 'westbromwichalbion',
    'West Ham United FC': 'westhamunited',
    'Wolverhampton Wanderers FC': 'wolverhamptonwanderers',
}

  return (
    <>
      <ListItem>Username: {myInfo[0]['Username']}</ListItem>
      <ListItem>Email: {myInfo[0]['email']}</ListItem>
      {myInfo[0]['favouriteTeam'] === '-' ? (
        <ListItem>Favourite Team: Select your favourite team!</ListItem>
      ):(
        <ListItem>Favourite Team: {Object.keys(teams).find(key => teams[key] === myInfo[0]['favouriteTeam'])}
        <Button
        onClick={() => setmyTeam(true)}
        style={{minWidth: '36px'}}>
        <AddCircleOutlineIcon/>
      </Button></ListItem>
      )}
    </>
  )
}

export default UserInfo;