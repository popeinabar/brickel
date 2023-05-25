import React from 'react'
import HerosSec from './component/HerosSec'
import NavBar from './component/NavBar'
import './About.css'
// import BetaTesters from './component/beta'

const About = () => {
  const data={
    start_journey:'',
    hero_heading:'About Us',
    hero_para1:'Hello, and welcome to BRICKEL! My name is AYUSH, and Im the founder of this community-driven platform. Im passionate about education and believe that everyone should have access to high-quality learning resources, regardless of their background or financial situation. Thats why I created BRIKEL to provide a space where people can trade knowledge, skills, and resources for free, and support each other in their learning journey. I hope you enjoy using our platform, and feel free to reach out to me if you have any questions or feedback.',
    hero_para2:'',
    image_home:"https://res.cloudinary.com/dvk41mh9f/image/upload/v1685013807/products/group_yyfskq.jpg",
  }
  return (
    <>
      <NavBar></NavBar>
      <div className='about_div' style={{minHeight:'80vh'}}>
        <HerosSec {...data}/>
        {/* <BetaTesters><BetaTesters> */}
      </div> 
    </>
  )
}

export default About