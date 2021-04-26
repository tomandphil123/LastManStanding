import React from 'react';
import ListItem from '@material-ui/core/ListItem';

const ResultsRatio = ({
  myInfo
}) => {
  return (
    <>
      <ListItem>Wins: {myInfo[0]['wins']}</ListItem>
      <ListItem>Losses: {myInfo[0]['losses']}</ListItem>
    </>
  )
}

export default ResultsRatio;