import React from "react";
import Serch from "./component/Search.js";
import filter from "./assets/filter.png";
import "./Learn.css";
import { useState, useEffect } from "react";
import Filters from "./component/Filters";
import { useAuthContext } from "./hooks/useAuthContext.js";

const Teach = () => {
  const { user } = useAuthContext();
  console.log("This is user", user);
  const [buttonPopup, setButtonPopup] = useState(true);

  const [data, setData] = useState(null); //

  useEffect(() => {
    //
    const fetchData = async () => {
      //
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/user"); //
      const json = await response.json(); //

      if (response.ok) {
        //
        setData(json); //
      } //
    }; //
    fetchData(); //
  }, []); //
  const [filteredData, setFilteredData] = useState({
    timing: "",
    subject: "",
    topic: "",
  });
  return (
    <>
      <div className="serch">
        <div className="top">
          <h1>Hi, Tutor</h1>
          <img
            className="img-filter"
            onClick={() => setButtonPopup(true)}
            src={filter}
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
        {data && (
          <Serch
            filteredData={filteredData}
            any={data}
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
    </>
  );
};

export default Teach;
