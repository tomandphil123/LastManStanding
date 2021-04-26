import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';


const BootstrapButton = withStyles({
  root: {
    'fontSize': 16,
    'padding': '6px 12px',
    'border': '1px solid',
    'lineHeight': 1.5,
    'backgroundColor': '#ffff',
    'color': '#490050',
    'borderColor': '#490050',
    '&:hover': {
      backgroundColor: '#490050',
      color: '#ffff',
      borderColor: '#490050',
      boxShadow: '#490050',
    },
    '&:active': {
      color: '#ffff',
      backgroundColor: '#490050',
      borderColor: '#490050',
    },
    '&:focus': {
      color: '#ffff',
      borderColor: '#490050',
      backgroundColor: '#490050',
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    overflow: 'scroll',
  },
}));

const SelectFavouriteTeam = ({
  myTeam,
  setmyTeam,
  teams,
  selectTeam,
}) => {

  const classes = useStyles();

  return (
    <>
      {myTeam ? (
        <Backdrop className={classes.backdrop} open={myTeam}>
          <Card style={{overflow: 'scroll', height: '650px'}}>
            <CardHeader avatar={
              <Avatar aria-label='team news' className={classes.avatar}>
                <AnnouncementIcon/>
              </Avatar>} 
              title='Pick Team'
              action={
                <div align='right' style={{paddingTop: '10px'}}>
                  <Button onClick={() => setmyTeam(!myTeam)}>
                    <CloseIcon/>
                  </Button>
                </div>
              }
            />
            <Divider/>
            <CardContent>
              <List>
                { Object.keys(teams).map((item, i) => (
                  <>
                    <ListItem>
                    <BootstrapButton
                      key={item}
                      variant='contained'
                      disableRipple
                      className={classes.margin}
                      onClick={() => {selectTeam(item); setmyTeam(false)}}
                    >
                        {item}
                    </BootstrapButton>
                    </ListItem>
                  </>
                ))}
              </List>
            </CardContent>
          </Card>
        </Backdrop>
      ) : (null)}
    </>
  )
}

export default SelectFavouriteTeam;