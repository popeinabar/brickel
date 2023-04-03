import React from 'react'
import './Serch.css'
import { Link } from 'react-router-dom';

 

const Serch = (props) => {
    const timing = props.filteredData.timing
    const subject = props.filteredData.subject
    const topic = props.filteredData.topic
  
  // console.log(timing);
  // console.log(props.filteredData.subject)
  return (
    <> 
      {                
        props.any.filter((user)=>{
          
          if (timing =='' && subject=='' && topic==''){
            return user
          }else if(
            user.timing.toLowerCase().includes(timing) && user.subject.toLowerCase().includes(subject) && user.topic.toLowerCase().includes(topic) 
          ){
            return user
          }
        }).map((user, key)=>{
            
            return(
            <div className='total'>
                        
            <div className='info'>
                <div className='image-div'>
                    <img className='image-info' src={user.image} alt='lerner-tutor'></img>{/*taking teacher and student image*/}
                </div>
                <ul className='flex'>
                        
                    
                    <div className='flex1'>
                            <li>
                                {props.name}: {user.name}
                            </li>
                            <li>
                                {props.subject}: {user.subject}
                            </li>
                            <li>
                                {props.topic}: {user.topic}
                            </li>
                            <li>
                                {props.timing}: {user.timing} 
                            </li>
                                
                    </div>
                    <div className='flex4'>
                        <div className='flex2'>
                            <li>
                                {props.likes} {user.likes}
                            </li>
                            <li>
                                {props.occupation}: {user.occupation} 
                            </li>
                            <li className='imp1'>
                                {props.impression}: {user.impression}
                            </li>
                        </div>
                        
                        <div className='flex3'>
                            <Link to={'/https://mail.google.com/mail/u/0/'}>
                                <button className='mailbtn'>Connect</button>
                            </Link>
                        </div>
                    </div>
                </ul>
                </div>
                <li className='imp2'>
                                {props.impression}: {user.impression}
                </li>
                `</div>
        )
        })}
    
    </>

  )
}

export default Serch