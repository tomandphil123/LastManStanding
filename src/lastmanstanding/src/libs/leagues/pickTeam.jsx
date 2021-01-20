import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#37003c',
      borderColor: '#ffff',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#37003c',
        borderColor: '#37003c',
        boxShadow: '#37003c',
      },
      '&:active': {
        boxShadow: '0069d9',
        backgroundColor: '0069d9',
        borderColor: '0069d9',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.3rem rgba(1,255,190,.5)',
      },
    },
  })(Button);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  
export default function PickTeam(props) {
    console.log(props.teams)
    const classes = useStyles();
    return (
        props.teams.map((item) => (
            <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
                {item}
            </BootstrapButton>
        ))
    )}