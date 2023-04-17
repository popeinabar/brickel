import React, {useState,useEffect} from 'react'
import user_data from './component/user_data'
import pen from './assets/pen_low.png'
import './User.css'
import img1 from './assets/img1.jpg'
import ToggleButton from './component/toggle'

const User = () => {
  const [isEditable, setIsEditable] = useState(true);
  const [isOccuEditable, setIsOccuEditable] = useState(true);
  const [isImpEditable, setIsImpuEditable] = useState(true);


  const handlePenClick = () => {
    console.log('clicked');
    setIsEditable(!isEditable);
    
    
  };

  const handlePenClick2 = () => {
    
    setIsImpuEditable(!isImpEditable)
  };
  const handlePenClick3 = () => {
    setIsOccuEditable(!isOccuEditable)
    
  };  


  const handleClickOutside = (event) => {
    const { target } = event;
    const inputElement = document.querySelector('.input-info');
    const penElement = document.querySelector('.pen');
  
    if (inputElement !== target && !penElement.contains(target)) {
      inputElement.readOnly = true;
      setIsEditable(true);
      // setIsOccuEditable(true)
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  

  

  return (
    <>
      <div className='user'>
        <div className='userinfo-1'>
          <div className='user-img-div'>
            <img className='image-info' src={img1} alt='lerner-tutor'></img>
          </div>
          <div className='row1'>
              <div className='user-name border' >
                <h3>
                  Name:
                  <input
                    className='input-info'
                    type='text'
                    placeholder='Name'
                    defaultValue={'Ayush'}
                    readOnly={isEditable}
                    // onBlur={handleInputBlur}
                  ></input>
                  <img
                    className='pen'
                    src={pen}
                    alt='pen'
                    onClick={handlePenClick}
                  />
                </h3>
              </div>
            <div className='user-email border' >
              <h3>
                E-Mail:<input type="text" className='email-input input-info'  readOnly value="ayushphenomal" />
              </h3>
            </div>
            <div className='user-dob border' >
              <h3>
                DOB:<input type="text" className='dob-input input-info'  readOnly value="2002" />
              </h3>
            </div>
          </div>
          <div className='row2'>
          <div className='user-name border' >
                <h3>
                  Occupation:
                  <input
                    className='input-info'
                    type='text'
                    placeholder='Occupation'
                    defaultValue={'teacher'}
                    readOnly={isOccuEditable}
                    // onBlur={handleInputBlur}
                  ></input>
                  <img
                    className='pen'
                    src={pen}
                    alt='pen'
                    onClick={handlePenClick3}
                  />
                </h3>
              </div>
            <div className='user-impress border' >
              <h3 >
                Impression:
                <textarea  className='impress-text input-info' type='text' placeholder='tell us about your self'
                            readOnly={isImpEditable} ></textarea >
                  <img  
                            className='pen'
                            // onClick={() => setButtonPopup(true)}
                            src={pen}
                            alt='pen'
                            onClick={handlePenClick2}
                  />
                </h3>
            </div>
          </div>
        </div>
        <ToggleButton/>
      </div>
    
    </>
  )
}

export default User