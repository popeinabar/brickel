import React from 'react'
import Serch from './component/Search.js'
import './Learn.css'
import Filters from './component/Filters'
import { useState, useEffect } from 'react'
import loader from '../src/assets/loder.gif'
import { useAuthContext } from './hooks/useAuthContext.js'

const Learn = () => {
  const [buttonPopup, setButtonPopup] = useState(true);
  const [filteredData, setFilteredData]=useState({  timing: "", 
  subject: "", 
  topic: "" })
  
  const [data, setData] = useState(null);//
  const [ loading, setLoading] = useState(true)
  const {user}= useAuthContext()


  useEffect(() => {//
      const fetchData = async () => {//
        const response = await fetch(process.env.REACT_APP_API_URL+'/api/user',{
          headers:{
            'Authorization': `Bearer ${user.token}`
          }
        });//
        const json = await response.json();//
  
        if (response.ok) {//
          setData(json);//
          setTimeout(()=>{
          setLoading(false)
        }, 2000)
        }
      };//
      if(user){
        fetchData();//

      }
    }, []);//
  // console.log(filteredData)
  
    

  return (


    <>
    {loading?(<div className="loder-div">
      <img className="loader" alt='loader' src={loader}/>
    </div>)
    :(
      <div className='serch' style={{ minHeight: "80vh" }}>
        <div className='top'>
          <h1>Hi, Learner</h1>
          <img
            className='img-filter'
            onClick={() => setButtonPopup(true)}
            src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1683310358/products/wly0lychg0dfmozsjjzk.png"}
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
        {data&&
        <Serch filteredData={filteredData}
                any={data}
                name='Name'
                subject='Subject'
                topic='Topic'
                timing='Timing'
                likes='Likes:'
                occupation='Occupation'
                impression='Impression'
                isTeaching={false}
        />
        }
      </div>
    )}
    </>
  );
};

export default Learn;
