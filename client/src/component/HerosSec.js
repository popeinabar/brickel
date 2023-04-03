import React from 'react';
import './HerosSec.css';
import { Link } from 'react-router-dom';

const HerosSec = (props) => {
  const showStartJourney = props.page === 'home';

  return (
    <>
      <div className='hero-teach'>
        {showStartJourney && (
          <div className='start-journey'>
            <p>{props.start_journey}</p>
            <Link to={'/teach'}>
              <button className='teach-btn'>
                Teach
              </button>
            </Link>
          </div>
        )}

        <div className='text'>
          <h2 className='hero-heading'>{props.hero_heading}</h2>
          <p className='hero-para1'>{props.hero_para1}</p>
          <p className='hero-para2'>{props.hero_para2}</p>
        </div>
   
        <img className='teach-img' src={props.image_home} alt='teach'/>
      </div>
    </>
  );
};

export default HerosSec;
