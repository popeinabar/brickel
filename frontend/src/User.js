import React, {useState,useEffect} from 'react'
import './User.css'
import ToggleButton from './component/toggle'
import { useAuthContext } from './hooks/useAuthContext'
import { useStudentContext } from './hooks/useStudentContext'
const User = () => {
  const pen ="https://res.cloudinary.com/dvk41mh9f/image/upload/v1685013773/products/pen_low_cinj75.png"
  const [isEditable, setIsEditable] = useState(true);
  const [isOccuEditable, setIsOccuEditable] = useState(true);
  const [isImpEditable, setIsImpuEditable] = useState(true);
  const {user}= useAuthContext()
//   console.log( `value of user ${user}`)

  const {students}= useStudentContext()


const userDocEmail=user.user.email;

console.log("this is user"+userDocEmail)
let currentUser;

// Use array methods like find to search for the current user
if (students) {
  students.map((student) => {
    console.log(student.Email+"this is students email")
    if (student.Email === userDocEmail) {
      currentUser = student;
      console.log("user found")
    }
  });
}else{
  console.log('user not found')
}

console.log( `value after comparision ${currentUser}`)

   
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
            <img className='image-info' src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1683527111/products/cwkjcrltybyquoecpanp.jpg"} alt='lerner-tutor'></img>
          </div>
          <div className='row1'>
              <div className='user-name border' >
                <h3>
                  Name:
                  <input
                    className='input-info'
                    type='text'
                    placeholder='Name'
                    defaultValue={currentUser.Name}
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
              {user && (

                
              <h3>
                E-Mail:<input type="text" className='email-input input-info'  readOnly value={user.user.email} />
              </h3>
              )}
            </div>
            <div className='user-dob border' >
              <h3>
                DOB:<input type="text" className='dob-input input-info'  readOnly value={currentUser.DOB.label} />
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