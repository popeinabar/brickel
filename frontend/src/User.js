import React, {useState,useEffect} from 'react'
import './User.css'
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import ToggleButton from './component/toggle'
import { useAuthContext } from './hooks/useAuthContext'
import { useStudentContext } from './hooks/useStudentContext'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Slide from '@mui/material/Slide';
const User = () => {
  const pen ="https://res.cloudinary.com/dvk41mh9f/image/upload/v1685013773/products/pen_low_cinj75.png"
  // const [isEditable, setIsEditable] = useState(true);
  // const [isOccuEditable, setIsOccuEditable] = useState(true);
  // const [isImpEditable, setIsImpuEditable] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const { user,isLoading } = useAuthContext();
  const { students,dispatch,loading } = useStudentContext();
  let currentUser;
  const userDocEmail=user?.user?.email;
  
  if (students) {
    students.map((student) => {
      if (student.Email === userDocEmail) {
        currentUser = student;
        console.log("user found")
      }
    }); 
  }else{
    console.log('user not found')
  }
  
  console.log(currentUser?.Email+ " this is students email")
  



  const [EditedName, setEditedName] = useState('');
console.log(currentUser?.Name)


  const [Editedimpress, setEditedimpress] = useState('');
  // console.log(Editedimpress)
  const [EditOcc, setEditOcc] = useState('');
  const [Email, setEmail]=useState('')
  const [Dob, setDob]=useState('')

  const [EditLearnTiming,setEditLearnTiming]=useState('')
  const [EditLearnTopic,setEditLearnTopic]=useState('')
  const [EditLearnSubject,setEditLearnSubject]=useState('')
  
  const [EditTeachTiming,setEditTeachTiming]=useState('')
  const [EditTeachTopic,setEditTeachTopic]=useState('')
  const [EditTeachSubject,setEditTeachSubject]=useState('')
  const [EditImage,setEditImage]=useState('')

  useEffect(() => {
if(currentUser!=null){
  setEditedName(currentUser?.Name)
  setEditedimpress(currentUser?.Impression)
  setEditOcc(currentUser?.Occupation)
  setEmail(currentUser?.Email)
  setDob(currentUser?.DOB)
  setEditLearnTiming(currentUser?.LTiming)
  setEditLearnTopic(currentUser?.LTopic)
  setEditLearnSubject(currentUser?.LSubject)
  setEditTeachTiming(currentUser?.TTiming)
  setEditTeachTopic(currentUser?.TTopic)
  setEditTeachSubject(currentUser?.TSubject)
  setEditImage(currentUser?.Image)
}

  },[currentUser])




// Use array methods like find to search for the current user
const handleUpdate = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/api/user/"+currentUser._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        Name: EditedName,
        Occupation: EditOcc,
        Impression: Editedimpress,
        LTiming:EditLearnTiming,
        LSubject:EditLearnSubject,
        LTopic:EditLearnTopic,
        TSubject:EditTeachSubject,
        TTopic:EditTeachTopic,
        TTiming:EditTeachTiming,
      })
    });
    if (response.ok) {
      const json = await response.json(); 
      console.log("data after update "+json)
      // Update local state with the edited values
      dispatch({ type: 'UPDATE_STUDENTS', payload: json });
      // Optionally, reset input fields
      setEditedName('');
      setEditedimpress('');
      setEditOcc('');
      setEditLearnTiming('')
      setEditLearnTopic('')
      setEditLearnSubject('')
      setEditTeachTiming('')
      setEditTeachTopic('')
      setEditTeachSubject('')
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } else {
      // Handle errors
      console.error('Failed to update user information');
    }
  } catch (error) {
    console.error('Error updating user information:', error);
  }
};

  
// console.log(`this is the loding state of student${loading}`)
// console.log(`this is the loding state of user${isLoading}`)
  return (
    <>
      <div className='user'>
      {loading && <LinearProgress/>}
      {showAlert && (
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Alert icon={<CheckIcon fontSize="inherit" />} className='upate-success' severity="success">
          Update success!
        </Alert>
      </Slide>
      )}

        <div className='userinfo-1'>
          <div className='user-img-div'>
            <img className='image-info' src={EditImage.url} alt='lerner-tutor'></img>
          </div>
          <div className='row1'>
            <div className='border'>

          <TextField className='textmui' id="filled-basic" label="Filled" variant="filled" value={EditedName} onChange={(e) => setEditedName(e.target.value)}/>
            </div>

             
            <div className='user-email border' >
            <TextField className='textmui' id="filled-basic" label="Filled" variant="filled" value={Email} />

            </div>
            <div className='user-dob border' >
            <TextField className='textmui' id="filled-basic" label="Filled" variant="filled" value={Dob} />

            </div>
          </div>
          <div className='row2'>
            <div className='border' >
            
                  <TextField className='textmui' id="filled-basic" label="Occupation" variant="filled" value={EditOcc} 
                    onChange={(e) => setEditOcc(e.target.value)} />

              </div>
            <div className='border' >
              
              <TextField  className='textmui' id="standard-textarea" multiline label="Impression"  variant="standard" rows={4} value={Editedimpress} onChange={(e) => setEditedimpress(e.target.value)}/>
             
            </div>
        {/* <button className='logout' onClick={handleUpdate}>update</button> */}
          </div>
        </div>
        <ToggleButton
          EditLearnTiming={EditLearnTiming}
          setEditLearnTiming={setEditLearnTiming}
          EditLearnSubject={EditLearnSubject}
          setEditLearnSubject={setEditLearnSubject}
          EditLearnTopic={EditLearnTopic}
          setEditLearnTopic={setEditLearnTopic}
          EditTeachTiming={EditTeachTiming}
          setEditTeachTiming={setEditTeachTiming}
          EditTeachTopic={EditTeachTopic}
          setEditTeachTopic={setEditTeachTopic}
          EditTeachSubject={EditTeachSubject}
          setEditTeachSubject={setEditTeachSubject}
          handleUpdate={handleUpdate}
        />
      </div>
    
    </>
  )
}

export default User