import {React, useState,useEffect} from "react";
import "./Search.css";

import { Link } from "react-router-dom";
import SearchCard from './searchCard'


const Search = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const timingf = props.filteredData.timing;
  const subjectf = props.filteredData.subject;
  const topicf = props.filteredData.topic;
  const data=props.any
  const isTeachingf=props.isTeaching

  
  return (
   <>
      {/* Check the window width and render the appropriate component */}
      {windowWidth <= 700 ? (
        <div className='mui-card-div'>
{/* for small screen */}
          <SearchCard 
          timingf={timingf}
          data={data}
          subjectf={subjectf}
          topicf={topicf}
          isTeachingf={isTeachingf}
          name='Name'
          subject='Subject'
          topic='Topic'
          timing='Timing'
          likes='Likes:'
          occupation='Occupation'
          impression='Impression'
          />
        </div>
      ) : (
        // Render your existing component for larger screens
        data
          .filter((user) => {
            const timing = isTeachingf ? user.LTiming : user.TTiming;
            const subjects = isTeachingf
              ? user.LSubject
              : user.TSubject;
            const topics = isTeachingf ? user.LTopic : user.TTopic;

            if (timingf === "" && subjectf === "" && topicf === "") {
              return true;
            } else if (
              timing.toLowerCase().includes(timingf) &&
              subjects.some((subject) =>
                subject.toLowerCase().includes(subjectf)
              ) &&
              topics.some((topic) => topic.toLowerCase().includes(topicf))
            ) {
              return true;
            }

            return false;
          })
          .map((user, key) => (
            <div className="total" key={key}>
              <div className="info">
              <div className="image-div">
            <img
              className="image-info"
              src={user.Image.url}
              alt="learner-tutor"
            />
          </div>
          <ul className="flex">
            <div className="flex1">
              <li>
                {props.name}: {user.Name}
              </li>
              <li>
                {props.subject}:{" "}
                {isTeachingf
                  ? user.LSubject.map((item) => `${item.subject}`).join(", ")
                  : user.TSubject.map((item) => `${item.subject}`).join(", ")}
              </li>
              <li>
                {props.topic}:{" "}
                {isTeachingf
                  ? user.LTopic.map((item) => `${item.Chapter}`).join(", ")
                  : user.TTopic.map((item) => `${item.Chapter}`).join(", ")}
              </li>
              <li>
                {props.timing}: {isTeachingf ? user.LTiming : user.TTiming}{" "}
              </li>
            </div>
            <div className="flex4">
              <div className="flex2">
                <li>
                  {props.occupation}: {user.Occupation}
                </li>
                <li className="imp1">
                  {props.impression}: {user.Impression}
                </li>
              </div>
              <div className="flex3">
                <a href={"mailto:" + user?.Email} className="connect">
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
          ))
      )}
    </>
  );
};

export default Search;
