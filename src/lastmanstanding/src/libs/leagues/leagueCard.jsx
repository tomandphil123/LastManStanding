import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      width: 250,
      height: 90,
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
      marginBottom: 12,
    },
  });

export default function LeagueCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const getClick = () => {
        console.log("click")
    }

    return (
        <button onClick={() => getClick()}>
        <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="h4" >
                {props.leagueId}
            </Typography>
            <Typography className={classes.pos} >
                League Status: {props.leagueStatus}
            </Typography>
        </CardContent>
        </Card>
        </button>
    );
}