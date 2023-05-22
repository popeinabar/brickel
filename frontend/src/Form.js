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


function Form() {
  const [page, setPage]= useState(0);

  const { signup, isLoading, errors } = useSignup();//
  const { user } = useAuthContext();
  const [Name, setName] = useState("");
  const [DOB, setDob] = useState(null);
  // console.log(DOB)
  const [Occupation, setOccupation] = useState("");
  const [Impression, setImpression] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [LSubject, setLSubject] = useState([]);
  // console.log(LSubject)
  // console.log(LSubject.map(item => `'${item.subject}'`).join(', '))
  const [LTopic, setLTopic] = useState([]);
  const [LTiming, setLTiming] = useState('');
console.log(LTiming)//value coming from the onchange
  const [TSubject, setTSubject] = useState([]);
  const [TTopic, setTTopic] = useState([]);
  const [TTiming, setTTiming] = useState('');
  console.log(TTiming)//value coming from onchnage 
  
  const [Image, setImage] = useState("");
  const [DisplayImage, setDisplayImage] = useState("");
// console.log(Image)
  const [error, setError] = useState(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const handleSumbitSignup = async (f) => {
    f.preventDefault();
    await signup(email, password);
    // let backendError = JSON.stringify(errors);
    console.log(errors);
    if (user === null) {
      setShowSignup(true);
    } else {
      setShowSignup(false);
      setPage(page + 1); // Move to the next page
    }
    // console.log(email, password)
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


  const FormTitle= ['Sign up', 'User Info','As a Lerner: What would you like to Learn','As a Teacher: What would you like to Teach', 'About you']


  const PageDisplay = ()=>{
    if(page===0){
        return (
            <>
              <form className="signup" onSubmit={handleSumbitSignup}>
                <TextField id="outlined-basic-email" label="Email" variant="outlined"   type="email"
                onChange={(f) => setEmail(f.target.value)}
                value={email}/>
                <TextField id="outlined-basic-pass" label="Password" variant="outlined"  type="password"
                 onChange={(f) => setPassword(f.target.value)}
                 value={password} />
                <button className="smit redirect" disabled={isLoading}>
                  {" "}
                  {user ? "Register Done" : "Register"}{" "}
                </button>
                {/* <Button variant="contained" disabled={isLoading}>Register</Button> */}
                {errors && <div>{errors}</div>}
              </form>
            </>
        )
    }
 else if (page===1){
        return(
            <>
              <TextField id="outlined-basic-name" label="Name" variant="outlined"   type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}  />
              
              <TextField id="outlined-basic-name" label="email" variant="outlined"   type="text"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}  />

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
            <Stack spacing={3} sx={{ width: 500 }}>
      
                <Autocomplete
                    multiple
                    id="tags-outlined-learn"
                    options={subject}
                    getOptionLabel={(option) => option.subject}
                    
                    filterSelectedOptions
                    value={LSubject}
                    onChange={(event, selectedOptions) => {
                      // Set the selected value using setLSubject
                      setLSubject(selectedOptions);
                      // Console log the selected value
                      // setLSubject(Lsub);
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
                </Stack>
                <Stack spacing={3} sx={{ width: 500 }}>

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

                </Stack>
                <Stack spacing={3} sx={{ width: 500 }}>
      
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
  <div className='form'>
      <div className='progress'>  </div>
      <div className='form-container'>
          <div className='header'>
              <h1>{FormTitle[page]}</h1>
          </div>
          <div className='body'>{PageDisplay()}</div>
          <div className='footer'>
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