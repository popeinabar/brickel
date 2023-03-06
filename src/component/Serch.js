import React from 'react'
import image_info from '../assets/img1.jpg'
import filter from '../assets/filter.png'
import './Serch.css'

const Serch = () => {
  return (
    <> 
        <div className='serch'>
            <div className='top'>
                <h1>Hi, Lerner</h1>
                <img className='img-filter' src={filter} alt='lerner-tutor'></img>
            </div>
            <div className='info'>
                <img className='image-info' src={image_info} alt='lerner-tutor'></img>
                <ul className='flex'>
                    
                    <div className='flex1'>
                    <li>
                        Name:
                    </li>
                    <li>
                        Subject:
                    </li>
                    <li>
                        topic:
                    </li>
                    <li>
                        Timing:10:55 to 11:55 
                    </li>
                    </div>
                    <div className='flex2'>
                    <li>
                        Rating:
                    </li>
                    <li>
                        Occupation:
                    </li>
                    <li>
                        Impression: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500
                    </li>
                    </div>
                    
                </ul>

            </div>
        </div>
    </>

  )
}

export default Serch