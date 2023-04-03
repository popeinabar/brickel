import React from 'react'
import Serch from './component/Serch.js'
import filter from './assets/filter.png'
import './Learn.css'
import { useState } from 'react'
import Filters from './component/Filters'
import Student_data from './component/Student_data.js'

const Teach = () => {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [filteredData, setFilteredData]=useState({  timing: "", 
  subject: "", 
  topic: "" })
  return (
    <>
    <div className='serch'>
        <div className='top'>
          <h1>Hi, Tutor</h1>
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
              any={Student_data}
              name='Name'
                subject='Subject'
                topic='Topic'
                timing='Timing'
                occupation='Occupation'
                impression='Impression'
      />  
      </div>
    
    </>
  )
}

export default Teach