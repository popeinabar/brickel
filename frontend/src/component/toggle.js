import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../component/toggle.css'
import blk_line from '../assets/black_line3.png'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { subject } from '../data/data';
import { chapters } from '../data/chapter';
import {  MobileTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const BrownSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: brown[600],
    '&:hover': {
      backgroundColor: alpha(brown[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: brown[600],
  },
}

));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };




function ToggleButton(props) {
// console.log(props.EditLearnTopic);

console.log(props.EditLearnTiming);

    function LearnOption(){
        return(
          
            <>
                <div className='toggle'>
                    <div className='style'>
                    <Box sx={{ '& button': { m: 1 } }}>
                        <Link to={'/teach'}>
                          <Button variant="contained" size="medium"
                            sx={{
                              backgroundColor:"black", "&:hover":{backgroundColor:" #351600"}
                             }}>
                            Teach
                          </Button>
                        </Link>  
                    </Box>
                   
                    <img
                    className='blk_line'
                    src={blk_line}
                    alt='line'
                     />
                    </div>
                    <div className='toggle-div1'>
                        <div className='toggle-time'>

                          <h5 className='value'>Timing:</h5>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <MobileTimePicker
                              className='timepicker'
                                value={dayjs(`2022-04-17T${props.EditLearnTiming}`)}
                                onChange={(date) => {
                                  const time = dayjs(date).format('HH:mm');
                                  props.setEditLearnTiming(time);
                                }}
                              />
                            </LocalizationProvider>

                             </div>
                                <div className='toggle-sub'>
                                <h5 className='value'>Subject:</h5>
                                <Autocomplete
                                  className='autocomplete'
                                  multiple
                                  id="tags-standard"
                                  options={subject}
                                  getOptionLabel={(option) => option.subject}//check this
                                  defaultValue={props.EditLearnSubject || []} 
                                  onChange={(event, selectedOptions) => {props.setEditLearnSubject(selectedOptions)}}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label="Subject to Learn"
                                      placeholder="Select Subject"
                                    />
                                  )}
                                />
                                </div>
                                  <div className='toggle-topic'>
                                  <h5 className='value'>topic:</h5>
                                  <Autocomplete
                                  className='autocomplete'
                                    multiple
                                    id="tags-standard"
                                    options={chapters}
                                    getOptionLabel={(option) => option.Chapter}
                                    defaultValue={props.EditLearnTopic || []}
                                    onChange={(event, selectedOptions) => {props.setEditLearnTopic(selectedOptions)}}
                                    renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      label="Multiple values"
                                      placeholder="Favorites"
                                    />
                                    )}
                                  />

                        </div>
                    </div>
                    {/* <div className='toggle-div2'>
                        <h5>Likes:</h5>
                    </div> */}
                    
                </div>
            </>

        )
    }



    function TeachOption(){
        return(
            <>
                <div className='toggle'>
                    <div className='style'>

                    <Box sx={{ '& button': { m: 1 } }}>
                        <Link to={'/learn'}>
                          <Button variant="contained" size="medium" 

                           sx={{
                                 backgroundColor:"black", "&:hover":{backgroundColor:" #351600"}
                              }}>
                            Learn
                          </Button>
                        </Link>  
                    </Box>

                    <img
                    className='blk_line'
                    src={blk_line}
                    alt='line'
                  />
                    </div>
                    <div className='toggle-div1'>
                      <div className='toggle-time'>
                      <h5 className='value'>Timing:</h5>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileTimePicker
                           sx={{
                           
                         }}
                          className='timepicker'
                            value={dayjs(`2022-04-17T${props.EditTeachTiming}`)}
                            onChange={(date) => {
                              const time = dayjs(date).format('HH:mm');
                              props.setEditTeachTiming(time);
                              
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                            <div className='toggle-sub'>
                              <h5 className='value'>Subject:</h5>
                              <Autocomplete
                                multiple
                                className='autocomplete'
                                id="tags-standard"
                                options={subject}
                                getOptionLabel={(option) => option.subject}//check this
                                defaultValue={props.EditTeachSubject || []} 
                                onChange={(event, selectedOptions) => {props.setEditTeachSubject(selectedOptions)}}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="standard"
                                    label="Subject to Teach"
                                    placeholder="Select Subject"
                                  />
                                )}
                              />
                            </div>

                        <div className='toggle-topic'>
                        <h5 className='value'>topic:</h5>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          className='autocomplete'
                          options={chapters}
                          getOptionLabel={(option) => option.Chapter}
                          defaultValue={props.EditTeachTopic || []}
                          onChange={(event, selectedOptions) => {props.setEditTeachTopic(selectedOptions)}}
                          renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Multiple values"
                            placeholder="Favorites"
                          />
                        )}
                        />

                        </div>

                    </div>
                    
                    
                </div>
            </>

        )
    }


  const [isOn, setIsOn] = useState(false);
  const {user}= useAuthContext()

  const handleClick = () => {
    setIsOn(!isOn);
  };
  const {logout} = useLogout()

  const handleLogout=()=>{
    
    logout()
  }
  return (
    
    <div>

<div className='user-function'>
    <FormControlLabel control={<BrownSwitch {...label} defaultChecked onClick={handleClick} 
     /> } label={isOn ? 'As a TEACHER' : 'As a STUDENT'}/>
    <div>
  {user && (
    
    <Link to={'/login'}>
     <button onClick={handleLogout} className='logout' >Log Out</button>
     </Link>
  )}
  <button className='logout' onClick={props.handleUpdate}>update</button>
      </div>
      </div>
      {isOn ? <LearnOption/> : <TeachOption/>}
  </div>
   

  );
}

export default ToggleButton;
