import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Crests from './crests';
import './crestBar.css';

const CrestBar = () => {
  const [screenWidth, setScreenWidth] = useState(null);
  const [crests, setCrests] = useState();

  function handleResize() {
    setScreenWidth(window.screen.width);
  }

  useEffect(() => {
    setScreenWidth(window.screen.width);
    axios.get('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamInfo')
        .then((response) => {
          setCrests(response['data']);
        });
    window.addEventListener('resize', handleResize);
  }, screenWidth);

  return (
    <Crests screenWidth={screenWidth} crests={crests} />
  );
};

export default CrestBar;
