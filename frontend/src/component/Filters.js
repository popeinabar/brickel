import React from 'react'
import './Filters.css'
//
import Serch from './Search'

//
import { useState, createContext } from 'react';

const valuesContext =createContext();


const Filters = (props) => {
  const [timing, setTiming] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  }
  

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  }

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  }
  const lowerCaseTiming = timing.toLowerCase();
  const lowerCaseSubject = subject.toLowerCase();
  const lowerCaseTopic = topic.toLowerCase();
  


  const {filteredData, setFilteredData} = props;

  
  
  const handleSubmit = (event) => { 
    event.preventDefault();
    let newFilteredData = {  timing: lowerCaseTiming, 
      subject: lowerCaseSubject, 
      topic: lowerCaseTopic };
      setFilteredData(newFilteredData)
      props.setTrigger(false)
    
  }
  
  return (props.trigger) ? (
    <>
    {/* <valuesContext.Provider value={filteredData}>

    </valuesContext.Provider> */}
      <div className='popup'>
        <div className='popup-inner'>
          <div className='head'>
            <h1>Filter for teachers</h1>
            <button className='button-close' onClick={()=> props.setTrigger(false)}> close</button> 
          </div>
          {props.children}
          <form className='fil-form' onSubmit={handleSubmit}>
            <ul>
              <li className='fil-li'>
                timing: <input className='fil-time' type="time" name="timing" value={timing} onChange={handleTimingChange} />
              </li>
              <li className='fil-li'>
                subject: <input className='fil-text' type="text" name="subject" value={subject} onChange={handleSubjectChange} />
              </li>
              <li className='fil-li'>
                topic: <input className='fil-text' type="text" name="topic" value={topic} onChange={handleTopicChange} />
              </li>
            </ul>
            <button className='smit' type="submit" >Filtering</button>
          </form>
        </div>
      </div>
            
    </>

  ) : "";
}


export default Filters
export { valuesContext }; 