import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../component/toggle.css'
import blk_line from '../assets/black_line3.png'
function ToggleButton() {

    function LearnOption(){
        return(
            <>
                <div className='toggle'>
                    <div className='style'>
                    <Link to={'/teach'}>
              <button className='teach-btn'>
                Teach
              </button>
            </Link>
                   
                    <img
                    className='blk_line'
                    src={blk_line}
                    alt='line'
                     />
                    </div>
                    <div className='toggle-div1'>
                        <h5>Timing:</h5>
                        <h5>Subject:</h5>
                        <h5>topic:</h5>
                    </div>
                    <div className='toggle-div2'>
                        <h5>Likes:</h5>
                    </div>
                    
                </div>
            </>

        )
    }



    function TeachOption(){
        return(
            <>
                <div className='toggle'>
                    <div className='style'>

                    <Link to={'/learn'}>
                <button className='learn-btn-head'>
                  Learn
                </button>
                    </Link>
                    <img
                    className='blk_line'
                    src={blk_line}
                    alt='line'
                  />
                    </div>
                    <div className='toggle-div1'>
                        <h5>Timing:</h5>
                        <h5>Subject:</h5>
                        <h5>topic:</h5>
                    </div>
                    
                    
                </div>
            </>

        )
    }


  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
    
    


      <button className='toggle-btn' onClick={handleClick}>{isOn ? 'As a TEACHER' : 'As a STUDENT'}</button>
      {isOn ? <LearnOption/> : <TeachOption/>}
    </div>
  );
}

export default ToggleButton;
