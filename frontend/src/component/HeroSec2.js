import React from 'react'
import './HeroSec2.css'
import { Link } from 'react-router-dom';


const HeroSec2 = () => {
  return (
    <>
    <div className='hero-learn'>
    <div className='text2'>
    <h2 className='hero2-heading'>Learn</h2>
    <p className='hero2-para1'>Learn for free from the points you you can earn by login in and 
by teaching others....</p>
    <p className='hero2-para'>The great aim of education is not knowledge but action!!!</p>
    </div>

    <div className='start2-journey'>
    <p>Lets goo...</p>
    <Link to={'/learn'}>
          <button className='learn-btn' >
    Learn
  </button>
  </Link>
  
    </div>
   
            <img className='learn-img' src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1685013885/products/study-home_ibtnmg.jpg"} alt='teach'/>
    </div>
    </>
  )
}

export default HeroSec2