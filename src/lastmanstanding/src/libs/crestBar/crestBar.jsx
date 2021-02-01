import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CrestBar = () => {
  const [crests, setCrests] = useState();
  useEffect(() => {
    axios.get('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/teamInfo')
        .then((response) => {
          setCrests(response['data']);
        });
  }, []);
  console.log(crests);
  return (
        typeof crests !== 'undefined' ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {crests.map((item) => (
            <div style={{padding: '5px'}} key={item['TeamName']}>
              <a href={item['Website']}>
                <img src={item['Crest']} alt= "team crests" height="40px"/>
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
