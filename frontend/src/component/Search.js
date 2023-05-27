import React from "react";
import "./Search.css";
import { Link } from "react-router-dom";

const Serch = (props) => {
  const timingf = props.filteredData.timing;
  const subjectf = props.filteredData.subject;
  const topicf = props.filteredData.topic;
  console.log(props.any[0].Image.url);
  // console.log(timing);
  // console.log(props.filteredData.subject)
  return (
    <>
    {/* filtering process */}
    {
  props.any
    .filter((user) => {
      const timing = props.isTeaching ? user.LTiming : user.TTiming;
      const subjects = props.isTeaching ? user.LSubject : user.TSubject;
      const topics = props.isTeaching ? user.LTopic : user.TTopic;

      if (timingf === "" && subjectf === "" && topicf === "") {
        return true;
      } else if (
        timing.toLowerCase().includes(timingf) &&
        subjects.some((subject) => subject.toLowerCase().includes(subjectf)) &&
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
                {props.isTeaching
                  ? user.LSubject.map((item) => `'${item.subject}'`).join(", ")
                  : user.TSubject.map((item) => `'${item.subject}'`).join(", ")}
              </li>
              <li>
                {props.topic}:{" "}
                {props.isTeaching
                  ? user.LTopic.map((item) => `'${item.Chapter}'`).join(", ")
                  : user.TTopic.map((item) => `'${item.Chapter}'`).join(", ")}
              </li>
              <li>
                {props.timing}: {props.isTeaching ? user.LTiming : user.TTiming}{" "}
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
}

    </>
  );
};

export default Serch;
