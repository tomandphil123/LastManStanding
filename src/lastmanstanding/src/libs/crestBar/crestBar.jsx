import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './crestBar.css';

  const CrestBar = () => {
    const [screenWidth, setScreenWidth] = useState(null);
    const [crests, setCrests] = useState();
    
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      setScreenWidth(window.screen.width)
    }

    useEffect(() => {
      axios.get('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamInfo')
          .then((response) => {
            setCrests(response['data']);
          });
      setScreenWidth(window.screen.width);
    }, window.addEventListener('resize', handleResize));

  return (
        typeof crests !== 'undefined' && screenWidth > 800 ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {crests.map((item) => (
            <div style={{padding: '5px'}}
              key={item['TeamName']}
              className="img-wrapper">
              <a href={item['Website']}>
                <img src={item['Crest']}
                  alt= "team crests"
                  height="40px"
                  className="hover-zoom"/>
              </a>
            </div>
          ))}
        </div>
        ) : (
            null
        )
  );
};

export default CrestBar;
