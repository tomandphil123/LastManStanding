import React from 'react';
import Navbar from '../navbar/navbar';


const Header = () => {
    return (
        <div className='header'>
          <div className="title">
            <h1>Last Man Standing</h1>
          </div>
          <div className='Navbar'>
            <Navbar/>
          </div>
        </div>
    )
};

export default Header