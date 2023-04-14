import React from 'react'
import HerosSec from './component/HerosSec';
import NavBar from './component/NavBar';
import HeroSec2 from './component/HeroSec2';
import books from './assets/back-nav.jpg'
import abc from './assets/teach-home.jpg'
import { Link } from 'react-router-dom';
import './home.css'

const Home = () => {

  const data={
    start_journey:'Start your journey here',
    hero_heading:'Tutoring',
    hero_para1:'Teach others to get points and use that points to get free one on one learning...',
    hero_para2:'Teaching is another form of learning!!!',
    image_home:abc,
    page:'home'
  }
  return (
    <>
      <header className='home-header'>
        <div className='head-slogan-div'>
          <h3 className='slogan'>Teach something, Learn something</h3>
          <div className='head-info-div'>
            <p className='head-info'>Education platform which provides free learning experience. Delve into the new world of learning...</p>
            <div className='head-button'>
              <Link to={'/teach'}>
                <button className='teach-btn-head'>
                  Teach
                </button>
              </Link>
              <Link to={'/learn'}>
                <button className='learn-btn-head'>
                  Learn
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    
      <div className='home-info'>
        <div className='start-about'>
          <h3 className='home-heading'>We are providing the tool for the
            students for learning for free and easily accessible and 
            teach the craft that you are good at.</h3>
          <Link to={'/about'}>
            <button className='about-btn'>
              About
            </button>
          </Link>
        </div>
        <div className='home-text'>
          <p className='home-para1'>BRICKEL is a revolutionary platform that connects learners and educators to exchange educational resources and services, without the need for money as a medium of exchange. By trading resources, knowledge, and skills, users can access high-quality educational content and support each other in their learning journey. Our community-driven approach ensures a more accessible and equitable way for people to access education, enabling users to learn from each other and improve their skills at no cost. Join us today and be a part of a vibrant community of learners and educators!</p>
        </div>
      </div>

      <HeroSec2 />
      <HerosSec {...data}/>
    </>
  );
};

export default Home;
