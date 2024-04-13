import React from "react";
import Serch from "./component/Search.js";
import "./Learn.css";
import { useState, useEffect } from "react";
import Filters from "./component/Filters";
import { useAuthContext } from "./hooks/useAuthContext.js";
import loader from '../src/assets/loder.gif'
import { useStudentContext } from "./hooks/useStudentContext.js";


const Teach = () => {
  const { user } = useAuthContext();

  const {students, dispatch}= useStudentContext()

  const [buttonPopup, setButtonPopup] = useState(true);
  const [ loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchData = async () => {
      console.log('api is called in teach')
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/user",{
          headers:{
            'Authorization': `Bearer ${user.token}`
          }
        }); 
      const json = await response.json(); 

      if (response.ok) {
        dispatch({type:'SET_STUDENTS', payload:json})
        setTimeout(()=>{
          setLoading(false)
        }, 2000)
      } 
    }; 
    if(user){
      fetchData(); 
    }
  }, [dispatch,user]); 
  const [filteredData, setFilteredData] = useState({
    timing: "",
    subject: "",
    topic: "",
  });


  return (
    <>
    {loading?(<div className="loder-div">
      <img className="loader" alt="loader" src={loader}/>
    </div>)
    :(
      <div className="serch" style={{ minHeight: "80vh" }}>
        <div className="top">
          <h1>Hi, Tutor</h1>
          <img
            className="img-filter"
            onClick={() => setButtonPopup(true)}
            src={"https://res.cloudinary.com/dvk41mh9f/image/upload/v1683310358/products/wly0lychg0dfmozsjjzk.png"}
            alt="filter"
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
        {students && (
          <Serch
            filteredData={filteredData}
            any={students}
            name="Name"
            subject="Subject"
            topic="Topic"
            timing="Timing"
            occupation="Occupation"
            impression="Impression"
            isTeaching={true}
          />
        )}
      </div>
    )}
      
    </>
  );
};

export default Teach;
