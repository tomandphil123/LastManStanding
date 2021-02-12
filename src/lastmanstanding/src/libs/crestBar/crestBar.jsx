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
    axios.get('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamInfo')
        .then((response) => {
          setCrests(response['data']);
        });
    setScreenWidth(window.screen.width);
  }, window.addEventListener('resize', handleResize));

  return (
    <Crests screenWidth={screenWidth} crests={crests} />
  );
};

export default CrestBar;
