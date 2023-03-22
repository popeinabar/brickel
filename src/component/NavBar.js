import React, { useState, useEffect } from 'react';
import logo from '../assets/whiteLogo-edited.png';
import logo_small from '../assets/small_logo.png'
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  
return (
    <nav className='navbar'>
      <div className="navbar-left">
        <img className='logoBlack' src={logo} alt="Logo" />
        <img className='logo-small' src={logo_small} alt="Logo" />
      </div>
      <div className="navbar-right">
        
          <div className='style'>
            <Link className='from-home' to={"/login"}>
         LOGIN
          </Link>
          </div>
          <div className='style'>
          <Link  className='from-home' to={'/home'}>
          HOME
          </Link>
          </div>
          <div className='style' >
            <Link className='from-home' to={'/about'}>
          ABOUT US
          </Link>
          </div>
          <div className='style'>
            <Link className='from-home' to={'/user'}> 
          USER
            </Link>
          </div>
        
      </div>
    </nav>
  );
}

export default NavBar;
