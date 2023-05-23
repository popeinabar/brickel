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




function ToggleButton() {

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
                        <h5>Timing:</h5>
                        <h5>Subject:</h5>
                        <h5>topic:</h5>
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
  const {logout} = useLogout()

  const handleLogout=()=>{
    logout()
  }
  return (
    <div>
    
    <FormControlLabel control={<BrownSwitch {...label} defaultChecked onClick={handleClick} 
     /> } label={isOn ? 'As a TEACHER' : 'As a STUDENT'}/>

     <button onClick={handleLogout} className='logout'>Log Out</button>


     {/* <button>Update</button> */}


      {isOn ? <LearnOption/> : <TeachOption/>}

    </div>
  );
}

export default ToggleButton;
