import React from "react";
import "./Form.css";
import { useSignup } from "./hooks/useSignup";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useState} from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { subject } from './data/data';
import {chapters} from './data/chapter';
import {years} from './data/year'
import { useEffect } from "react";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";



function Form() {
  const [page, setPage]= useState(0);
  const navigate = useNavigate();
  const { signup, isLoading, errors } = useSignup();//
  const { user } = useAuthContext();
  const [Name, setName] = useState("");
  const [DOB, setDob] = useState(null);
  // console.log(DOB)
  const [Occupation, setOccupation] = useState("");
  // console.log(Occupation)
  const [Impression, setImpression] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  const [LSubject, setLSubject] = useState([]);
  const [LTopic, setLTopic] = useState([]);
  const [LTiming, setLTiming] = useState('11:11');
  const [LTimingObj, setLTimingObj] = useState(dayjs('2022-04-17T11:11'));

  const [TSubject, setTSubject] = useState([]);
  const [TTopic, setTTopic] = useState([]);
  const [TTiming, setTTiming] = useState('11:22');
  const [TTimingObj, setTTimingObj] = useState(dayjs('2022-04-17T11:22'));

  const [Image, setImage] = useState("");
  const [DisplayImage, setDisplayImage] = useState("");
  const [error, setError] = useState(null);
  console.log(error)

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(password)
  const [showSignup, setShowSignup] = useState(false);

  const handleSumbitSignup = async (f) => {
    f.preventDefault();
    await signup(email, password);
    
    if (user === null) {
      setShowSignup(true);
    } else {
      setShowSignup(false);
      setPage(1); // Move to the next page
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setDisplayImage(file);
    const image = await convertToBase64(file);
    setImage(image);
  };
  const handleSumbit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('you must be logged in')
      return
    }
    if (isSubmitting) {
      return; // Form is already being submitted
    }
    setIsSubmitting(true);
    const userData = {
      Name,
      DOB,
      Occupation,
      Impression,
      LSubject,
      LTopic,
      LTiming,
      TSubject,
      TTopic,
      TTiming,
      Image,
      Email: newEmail,
    };
    const response = await fetch(process.env.REACT_APP_API_URL + "/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    //setting back to default value
    if (response.ok) {
      setName("");
      setDob(null);
      setOccupation("");
      setImpression("");
      setLSubject([]);
      setLTopic([]);
      setLTiming("");
      setTSubject([]);
      setTTopic([]);
      setTTiming("");
      setImage("");
      setError(null);
      setNewEmail("");
      setIsFormSubmitted(true);
      console.log("new user added");
      navigate("/home")
      // history.push("/home");
    }
    setIsSubmitting(false);
  };

  
    useEffect(() => {
      if(user){

        setNewEmail(user.user.email);
      }
    }, [user])

  

  const FormTitle= []


  const PageDisplay = ()=>{
    if(page===0){
        return (
            <>
              <div className="signup_form">

                <form className="signup" onSubmit={handleSumbitSignup}>
                {/* <div className="signup_form_inner"> */}
                  <h1>Register</h1>
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="input_fields">
                    <Stack
                      component="form"
                      sx={{
                        width: '25ch',
                      }}
                      spacing={2}
                      noValidate
                      autoComplete="off"
                      >

                          <TextField id="outlined-basic-email" label="Email" variant='filled'  type="email"
                          onChange={(f) => setEmail(f.target.value)}
                          value={email}/>
                        
                          <TextField id="outlined-basic-pass" className="pass_field" label="Password" variant='filled'  type="password"
                          onChange={(f) => setPassword(f.target.value)}
                          value={password} />

                    </Stack>

                    
                    </div>
                    
                </Box>
                <div className="register_btn">

                  <button className="smit redirect" disabled={isLoading}>
                    {" "}
                    {user ? "Register Done" : "Register"}{" "}
                  </button>
                  {errors && <div>{errors}</div>}

                </div>
                {/* </div> */}
                </form>
 

              </div>
            </>
        )
    }
    //if user logged in dont show the form by using this {user){)}}
 else if (page===1){
        return(
            <>
            <div className="user_form">
              <div className="user_form_inner">

              <h1>User info</h1>
              <Stack
                component="form"
                
                spacing={2}
                noValidate
                autoComplete="off"
              >

              <TextField id="outlined-basic-name" label="Name" variant="filled"   type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}  />
              
              <TextField id="outlined-basic-name" label="email" variant="filled"   type="text" InputProps={{readOnly: true,}}
              value={user.user.email}  />

              <TextField id="outlined-basic-name" label="Occupation" variant="filled"   type="text"
                onChange={(e) => setOccupation(e.target.value)}
                value={Occupation}  />

              </Stack>
              <div className="user-data">
                
                <label className="L">Image: </label>
                <input
                 
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                  accept="image/*"//
                />
              </div>      
              
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 200 }}
                  getOptionLabel={(option) => option.label}
                  value={DOB}
                  onChange={(event, selectedOption) => {
                    setDob(selectedOption);
                    console.log(selectedOption?.label);
                  }}
                  renderInput={(params) => <TextField {...params} variant='filled' label="Year of birth" />}
                />

              </div>

            </div>
            </>
          )
      }

            


    else if (page===2){
        return(
            <>
            <div className="learn_form">

            <div className="learn_form_inner">

            <h1>As a Learner: What would you like to Learn</h1>
            <Stack spacing={3}>
      
                <Autocomplete
                    multiple
                    id="tags-outlined-learn"
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    
                    filterSelectedOptions
                    value={LSubject}
                    onChange={(event, selectedOptions) => {
                      // Set the selected value using setLTopic
                      setLSubject(selectedOptions)
                    
                      // const Lern= selectedOptions.map(item => `'${item.subject}'`).join(', ')
                     
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant='filled'
                        label="Subject to Learn"
                        placeholder="Subject"
                    />
                    )}
                /> 
               

                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={chapters}
                    getOptionLabel={(option) => option.Chapter}
                    filterSelectedOptions
                    value={LTopic}
                    onChange={(event, selectedOptions) => {
                      // Set the selected value using setLTopic
                      setLTopic(selectedOptions)
                    
                      // const Lern= selectedOptions.map(item => `'${item.subject}'`).join(', ')
                     
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant='filled'
                            label="Chapters to Learn"
                            placeholder="Chapters"
                        />
                    )}
                />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={LTimingObj}
                onChange={(date) => {
                  const time = dayjs(date).format('HH:mm'); // Extract the time portion
                  setLTiming(time);
                  setLTimingObj(date)
                  console.log("Test L onChange: ",LTiming)
                }}
                />
            </LocalizationProvider>
              </Stack>

            </div>

            </div>
            </>
        )
    }
    else if(page===3){
        return(
            <>
            <div className="learn_form">

            <div className="learn_form_inner">

            <h1>As a Teacher: What would you like to Teach</h1>
                <Stack spacing={3}>
      
                <Autocomplete
                    multiple
                    id="tags-outlined-learn"
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    filterSelectedOptions
                    value={TSubject}
                    onChange={(event, selectedOptions) => {
                      // Set the selected value using setTSubject
                      setTSubject(selectedOptions);

                      // Console log the selected value
                      // console.log("teach:",selectedOptions.map((option) => option.subject));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='filled'
                        label="Subject to teach"
                        placeholder="Subject"
                      />
                    )}
                  />
      
                <Autocomplete
                    multiple
                    id="tags-outlined-Ttopic"
                    options={chapters}
                    getOptionLabel={(option) => option.Chapter}
                    filterSelectedOptions
                    value={TTopic}
                    onChange={(event, selectedOptions) => {
                      // Set the selected value using setLTopic
                      setTTopic(selectedOptions);
                  
                      // Console log the selected value
                      // console.log("Tlearn: ",selectedOptions.map((option) => option.Chapter));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant='filled'
                            label="Chapters to teach"
                            placeholder="Chapters"
                        />
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={TTimingObj}
                onChange={(date1) => {
                  const time1 = dayjs(date1).format('HH:mm'); // Extract the time portion
                  setTTiming(time1);
                  setTTimingObj(date1)
                  console.log("Test T onChange: ",TTiming)
                }}
                />
            </LocalizationProvider>

             </Stack>

              </div>

              </div>
            </>
        )
    }
    else{
        return(
            <>
            <div className="impression_outer">

            <div className="impression border">
                  {/* <h1> About you</h1> */}

                <h3>
                   
                        Impression:
                        <textarea  className='impress-text input-info' type='text' placeholder='tell us about your self'
                        value={Impression}
                        onChange={(e) => setImpression(e.target.value)}
                        ></textarea >
                   
                </h3>
                {error && <div className="error">{error}</div>}
                <button className="addme" disabled={isSubmitting} onClick={handleSumbit}>Add me</button>

            </div>

            </div>

            </>
        )
    }
}


return (
  <div className='switch' style={{ minHeight: "80vh" }}>
      <div className='container'>
          <div className='body'>{PageDisplay()}</div>
          <div className='buttons'>
          <Stack spacing={2} direction="row">

              <Button variant="contained" 
              className="pre"
              disabled={page === 1 || page===0}
              onClick={()=>{
                  setPage((currPage)=> currPage-1);
              }}
              >previous</Button>
              <Button variant="contained" 
              disabled={page === 4 || page===0}
              onClick={()=>{
                  setPage((currPage)=> currPage+1);
              }}
              >Next</Button>

          </Stack>
          </div>
      </div>
  </div>
)

  
}

export default Form;


//converting image to base 64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}