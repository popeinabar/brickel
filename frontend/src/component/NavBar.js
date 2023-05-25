import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
  
return (
    <nav className='navbar'>
      <div className="navbar-left">
      <Link  className='from-home' to={'/home'}>
        <img className='logowhite' src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1685013919/products/whiteLogo-edited_qidhvo.png"} alt="Logo" />
        <img className='logo-small' src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1683310212/products/ax20nqpl98nrayimhmnq.png"} alt="Logo" />
          
          </Link>
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
