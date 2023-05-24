import React from "react";
import "./Form.css";
import { useSignup } from "./hooks/useSignup";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { useState } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';




function Form() {
  const [page, setPage]= useState(0);
  //show password
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { signup, isLoading, errors } = useSignup();//
  const { user } = useAuthContext();
  const [Name, setName] = useState("");
  const [DOB, setDob] = useState(null);
  // console.log(DOB)
  const [Occupation, setOccupation] = useState("");
  const [Impression, setImpression] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  const [LSubject, setLSubject] = useState([]);
  // console.log(LSubject.map(item => `'${item.subject}'`).join(', '))
  const [LTopic, setLTopic] = useState([]);
  const [LTiming, setLTiming] = useState('');
// console.log(LTiming)//value coming from the onchange
  const [TSubject, setTSubject] = useState([]);
  const [TTopic, setTTopic] = useState([]);
  const [TTiming, setTTiming] = useState('');
  // console.log(TTiming)//value coming from onchnage 
  
  const [Image, setImage] = useState("");
  const [DisplayImage, setDisplayImage] = useState("");
  const [error, setError] = useState(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleSumbitSignup = async (f) => {
    f.preventDefault();
    await signup(email, password);
    
    if (user === null) {
      setShowSignup(true);
    } else {
      setShowSignup(false);
      setPage(page + 1); // Move to the next page
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
      setPage(page + 1);
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
                <div className="signup_form_inner">
                  <h1>signup</h1>
                <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch',},
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="input_fields">

                  <TextField id="outlined-basic-email" label="Email" variant="outlined"   type="email"
                  onChange={(f) => setEmail(f.target.value)}
                  value={email}/>
                  {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                   <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(f) => setPassword(f.target.value)}
                        value={password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        />
                      </FormControl> */}
                  <TextField id="outlined-basic-pass" className="pass_field" label="Password" variant="outlined"  type="password"
                  onChange={(f) => setPassword(f.target.value)}
                  value={password} />
                    
                    </div>
                    
                </Box>
                <div className="register_btn">

                  <button className="smit redirect" disabled={isLoading}>
                    {" "}
                    {user ? "Register Done" : "Register"}{" "}
                  </button>
                  {errors && <div>{errors}</div>}

                </div>
                </div>
                </form>


              </div>
            </>
        )
    }
    //if user logged in dont show the form by using this {user){)}}
 else if (page===1){
        return(
            <>
              <h1>User info</h1>
              <TextField id="outlined-basic-name" label="Name" variant="outlined"   type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}  />
              
              <TextField id="outlined-basic-name" label="email" variant="outlined"   type="text" InputProps={{readOnly: true,}}
              value={user.user.email}  />

            <label className="L">Image</label>
            <input
              className="user-data"
              type="file"
              onChange={(e) => handleFileUpload(e)}
              accept="image/*"//
            />
              
              <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={years}
                  sx={{ width: 300 }}
                  getOptionLabel={(option) => option.label}
                  value={DOB}
                  onChange={(event, selectedOption) => {
                    setDob(selectedOption);
                    console.log(selectedOption?.label);
                  }}
                  renderInput={(params) => <TextField {...params} label="Year of birth" />}
                />
            </>
          )
      }

            


    else if (page===2){
        return(
            <>
            <h1>As a Lerner: What would you like to Learn</h1>
            <Stack spacing={3} sx={{ width: 500 }}>
      
                <Autocomplete
                    multiple
                    id="tags-outlined-learn"
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    
                    filterSelectedOptions
                    value={LSubject}
                    onChange={(event, selectedOptions) => {
                    
                      setLSubject(selectedOptions);
                     
                      const Lsub=selectedOptions.map((option) => option.subject)
                      console.log("lern: ",Lsub);
                    }}
                    renderInput={(params) => (
                    <TextField
                        {...params}
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
                      setLTopic(selectedOptions);
                  
                      // Console log the selected value
                      console.log("Llearn: ",selectedOptions.map((option) => option.Chapter));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Chapters to Learn"
                            placeholder="Chapters"
                        />
                    )}
                />
              </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={LTiming}
                onChange={(date) => {
                  const time = dayjs(date).format('HH:mm'); // Extract the time portion
                  setLTiming(time);
                  console.log(time)
                }}
                />
            </LocalizationProvider>
            </>
        )
    }
    else if(page===3){
        return(
            <>
            <h1>As a Teacher: What would you like to Teach</h1>
                <Stack spacing={3} sx={{ width: 500 }}>
      
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
                      console.log("teach:",selectedOptions.map((option) => option.subject));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
                      console.log("Tlearn: ",selectedOptions.map((option) => option.Chapter));
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Chapters to teach"
                            placeholder="Chapters"
                        />
                    )}
                />
                </Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={TTiming}
                onChange={(date1) => {
                  const time1 = dayjs(date1).format('HH:mm'); // Extract the time portion
                  setTTiming(time1);
                  
                }}
              />
            </LocalizationProvider>
            </>
        )
    }
    else{
        return(
            <>
            <h1>Impression</h1>
                <h3 >
                    <div>
                        Impression:
                        <textarea  className='impress-text input-info' type='text' placeholder='tell us about your self'
                        onChange={(e) => setOccupation(e.target.value)}
                        value={Occupation}
                        ></textarea >
                    </div>
                </h3>
                {/* <Button variant="contained" onClick={handleSumbit}>Submit</Button> */}
                <button className="addme" disabled={isSubmitting} onClick={handleSumbit}>Add me</button>

            </>
        )
    }
}


return (
  <div className='switch' style={{ minHeight: "80vh" }}>
      <div className='container'>
          <div className='header'>
              {/* <h1>{FormTitle[page]}</h1> */}
          </div>
          <div className='body'>{PageDisplay()}</div>
          <div className='buttons'>
              <Button variant="contained" 
              disabled={page === 1}
              onClick={()=>{
                  setPage((currPage)=> currPage-1);
              }}
              >previous</Button>
              <Button variant="contained" 
              disabled={page === FormTitle.length - 1}
              onClick={()=>{
                  setPage((currPage)=> currPage+1);
              }}
              >Next</Button>
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