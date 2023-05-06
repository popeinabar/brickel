import React from "react";
import "./Search.css";
import { Link } from "react-router-dom";

const Serch = (props) => {
  const timing = props.filteredData.timing;
  const subject = props.filteredData.subject;
  const topic = props.filteredData.topic;
  console.log(props.any[0].Image.url);
  // console.log(timing);
  // console.log(props.filteredData.subject)
  return (
    <>
      {props.any
        .filter((user) => {
          if (props.isTeaching === false) {
            console.log(user.LTiming.toLowerCase);
            if (timing === "" && subject === "" && topic === "") {
              return user;
            } else if (
              user.LTiming.toLowerCase().includes(timing) &&
              user.LSubject.toLowerCase().includes(subject) &&
              user.LTopic.toLowerCase().includes(topic)
            ) {
              return user;
            }
          } else if (props.isTeaching === true) {
            if (timing === "" && subject === "" && topic === "") {
              return user;
            } else if (
              user.TTiming.toLowerCase().includes(timing) &&
              user.TSubject.toLowerCase().includes(subject) &&
              user.TTopic.toLowerCase().includes(topic)
            ) {
              return user;
            }
          }
        })
        .map((user, key) => {
          {
            console.log(user);
          }
          return (
            <div className="total">
              <div className="info">
                <div className="image-div">
                  <img
                    className="image-info"
                    // src={props.any[0].Image.url}
                    src={user.Image.url}
                    alt="lerner-tutor"
                  ></img>
                  {/*taking teacher and student image*/}
                </div>
                <ul className="flex">
                  <div className="flex1">
                    <li>
                      {/* {console.log(props)} */}
                      {props.name}:{" "}{user.Name}
                    </li>
                    <li>
                      {props.subject}:{" "}{props.isTeaching ? user.LSubject : user.TSubject}

                    </li>
                    <li>
                     {props.topic}:{" "}
                    
                        {props.isTeaching ? user.LTopic : user.TTopic}
                      
                    </li>
                    <li>
                       {props.timing}:{" "}
                    
                        {props.isTeaching ? user.LTiming : user.TTiming}{" "}
                      
                    </li>
        
                  </div>
                  <div className="flex4">
                    <div className="flex2">
                      {/* <li>
                                {props.likes} {user.likes}
                            </li> */}
                      <li>
                        {props.occupation}: {user.Occupation}
                      </li>
                      <li className="imp1">
                        {props.impression}: {user.Impression}
                      </li>
                    </div>

                    <div className="flex3">
                      <a
                        href={"mailto:" + user?.Email}
                        className="connect"
                        Connect
                      >
                        Connect
                      </a>
                    </div>
                  </div>
                </ul>
              </div>
              <li className="imp2">
              {props.impression}: {user.Impression}
              </li>
            </div>
          );
        })}
    </>
  );
};

export default Serch;
