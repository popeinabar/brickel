import React from 'react'
import './Serch.css'
import { Link } from 'react-router-dom';

 

const Serch = (props) => {
    const timing = props.filteredData.timing
    const subject = props.filteredData.subject
    const topic = props.filteredData.topic
  console.log(props.any)
  // console.log(timing);
  // console.log(props.filteredData.subject)
  return (
    <> 
      {      
                
        props.any.filter((user)=>{
          
          if(props.isTeaching===false){
            console.log(user.LTiming.toLowerCase)
            if (timing ==='' && subject==='' && topic===''){
              return user
            }else if(
              (user.LTiming.toLowerCase().includes(timing)) && (user.LSubject.toLowerCase().includes(subject)) && (user.LTopic.toLowerCase().includes(topic)) 
              ){
                return user
              }
            }
            else if(props.isTeaching===true){
            console.log(user)
            if (timing ==='' && subject==='' && topic===''){
              return user
            }else if(
              (user.TTiming.toLowerCase().includes(timing)) && (user.TSubject.toLowerCase().includes(subject)) && (user.TTopic.toLowerCase().includes(topic)) 
            ){
              return user
            }
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
                                
                                {console.log(props)}
                                {props.name}: {user.Name}
                            </li>
                            <li>
                              
                                {props.subject}: {props.isTeaching?user.TSubject:user.LSubject}
                            </li>
                            <li>
                                {props.topic}: {props.isTeaching?user.TTopic:user.LTopic}
                            </li>
                            <li>
                                {props.timing}: {props.isTeaching?user.TTiming:user.LTiming} 
                            </li>
                                
                    </div>
                    <div className='flex4'>
                        <div className='flex2'>
                            {/* <li>
                                {props.likes} {user.likes}
                            </li> */}
                            <li>
                                {props.occupation}: {user.Occupation} 
                            </li>
                            <li className='imp1'>
                                {props.impression}: {user.Impression}
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
                </div>
        )
        })}
    
    </>

  )
}

export default Serch