import React from 'react';
import PropTypes from 'prop-types';

const Crests = ({
  screenWidth,
  crests,
}) => {
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

Crests.propTypes = {
  screenWidth: PropTypes.number,
  crests: PropTypes.array,
};

Crests.defaultProps = {
  crests: [],
  screenWidth: 0
};

export default Crests;
