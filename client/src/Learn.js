import React from 'react'
import Serch from './component/Serch.js'
import filter from './assets/filter.png'
import './Learn.css'
import Filters from './component/Filters'
import { useState } from 'react'
import data from './component/data'

const Learn = () => {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [filteredData, setFilteredData]=useState({  timing: "", 
  subject: "", 
  topic: "" })
  // console.log(filteredData)
  
    

  return (


    <>
      <div className='serch'>
        <div className='top'>
          <h1>Hi, Lerner</h1>
          <img
            className='img-filter'
            onClick={() => setButtonPopup(true)}
            src={filter}
            alt='filter'
          />
          {buttonPopup && (
            <Filters
              filteredData={filteredData}
              trigger={buttonPopup}
              setFilteredData={setFilteredData}
              setTrigger={setButtonPopup}
            />
          )}
        </div>
        <Serch filteredData={filteredData}
                any={data}
                name='Name'
                subject='Subject'
                topic='Topic'
                timing='Timing'
                likes='Likes:'
                occupation='Occupation'
                impression='Impression'

        />
      </div>
    </>
  );
};

export default Learn;
