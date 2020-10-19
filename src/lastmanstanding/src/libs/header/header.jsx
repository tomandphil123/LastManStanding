import React from 'react';
import Navbar from '../navbar/navbar';


const Header = () => {
    return (
        <div className='header'>
          <div>
            <img src={require('../../images/logo.png')} className="App-logo" alt="logo" height='75px' width='75px'/>
          </div>
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