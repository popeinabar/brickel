import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className='about'>
      <div>
      <h3>BRICKEL</h3>
      </div>
      <div>
        <p className='about-head'>Company</p>
        <ul>
        <Link className='about-li' to={'/about'}>
          <li>
            Team
          </li>
        </Link>
        <Link className='about-li' to={'/about'}>
          <li>
            Blog
          </li>
        </Link>
          </ul>
      </div> 
      <div>
        <p className='about-head'>Contact</p>
        <ul>
          <li>
            Help & support
          </li>
          <li>
            About us
          </li>
        </ul>
      </div>
      <div>
        <p className='about-head'>Social</p>
        <ul>
          <li>
           Instagram
          </li>
          <li>
            LinkedIn
          </li>
        </ul>
        </div>
        <div className='donate'>
          <h5>Donate me</h5>
        </div>
    </div>  
    
    
    </>
  )
}

export default Footer