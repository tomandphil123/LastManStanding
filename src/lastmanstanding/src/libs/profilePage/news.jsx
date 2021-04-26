import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  square: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    paddingRight: '8px'
  },
}));


const News = ({
  myInfo,
  teamInfo,
  setmyTeam
}) => {

  const classes = useStyles();

  return (
    <>
    {myInfo[0]['favouriteTeam'] !== '-' ? (
      typeof teamInfo !== 'undefined' ? (
        teamInfo.map(item => (
          <List key={item['title']}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar variant='square' alt='News' src={item['imgsrc']} className={classes.square}/>
              </ListItemAvatar>
              <ListItemText
                primary={<a href={item['link']}>{item['title']}</a>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component='span'
                      variant='body2'
                      color='textPrimary'>
                      <p>{item['shortdesc']}</p>
                    </Typography>
                  </React.Fragment>}/>
            </ListItem>
            <Divider light />
          </List>
        ))
      ) : (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
          <CircularProgress style={{color: '#490050', marginRight:'12px'}}/>
          <p>Loading news</p>
        </div>
      )
  ) : (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '60vh'}}>
      <h1>Choose your favourite team!</h1>
      <Button onClick={() => setmyTeam(true)}>
        <AddCircleOutlineIcon/>
      </Button>
    </div>
  )}
  </>
  )
}

export default News;