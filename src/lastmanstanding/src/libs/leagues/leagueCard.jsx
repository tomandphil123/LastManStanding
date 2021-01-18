import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 250,
      width: 'auto',
      height: 100,
      backgroundColor: "#37003c",
      color: "#fff",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      paddingwordBottom: 15,
    },
  });

export default function LeagueCard(props) {
    const classes = useStyles();

    return (

        <button onClick={() => props.openLeague(props.leagueId)}>
        <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="h4" >
                {props.leagueId}
            </Typography>
            <Typography>
                League Status: {props.leagueStatus}
            </Typography>
            <Typography className={classes.pos} >
                Current Pick: N/A
            </Typography>
        </CardContent>
        </Card>
        </button>
    );
}