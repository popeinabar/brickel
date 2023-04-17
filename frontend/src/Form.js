import React from "react";
import "./Form.css";
import { useSignup } from "./hooks/useSignup";
import { Link } from "react-router-dom";

import { useState } from "react";
function Form() {
  const { signup, isLoading, errors } = useSignup();
  const [Name, setName] = useState("");
  const [DOB, setDob] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [Impression, setImpression] = useState("");

  const [LSubject, setLSubject] = useState("");
  const [LTopic, setLTopic] = useState("");
  const [LTiming, setLTiming] = useState("");

  const [TSubject, setTSubject] = useState("");
  const [TTopic, setTTopic] = useState("");
  const [TTiming, setTTiming] = useState("");

  const [error, setError] = useState(null);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(true);

  const handleSumbitSignup = async (f) => {
    f.preventDefault();
    await signup(email, password);
    console.log(errors);
    if (errors) {
      setShowSignup(false);
    }

    // console.log(email, password)
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const userData = {
      Name,
      DOB,
      Occupation,
      Impression,
      LSubject,
      LTopic,
      LTiming,
      TSubject,
      TTopic,
      TTiming,
    };
    const response = await fetch(process.env.REACT_APP_API_URL,"/api/user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setDob("");
      setOccupation("");
      setImpression("");
      setLSubject("");
      setLTopic("");
      setLTiming("");
      setTSubject("");
      setTTopic("");
      setTTiming("");
      setError(null);
      setIsFormSubmitted(true);
      console.log("new user added");
    }
  };

  return (
    <>
      <div>
        {showSignup && (
          <form className="signup" onSubmit={handleSumbitSignup}>
            <div className="popup">
              <div className="popup-inner form-popup">
                <div className="message">
                  <h3>Register here</h3>
                </div>
                <label>Email:</label>
                <input
                  type="email"
                  onChange={(f) => setEmail(f.target.value)}
                  value={email}
                />
                <label>Password</label>
                <input
                  type="password"
                  onChange={(f) => setPassword(f.target.value)}
                  value={password}
                />
                <button className="smit redirect" disabled={isLoading}>
                  {" "}
                  Register{" "}
                </button>

                {errors && <div>{errors}</div>}
              </div>
            </div>
          </form>
        )}
        {console.log(errors)}

        <form className="user-form" onSubmit={handleSumbit}>
          <h4 className="greeting"> Welcome user😍 Fill in your credentials</h4>

          <label className="L">Name</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={Name}
          />
          <label className="L">DOB</label>
          <input
            className="user-data"
            type="number"
            onChange={(e) => setDob(e.target.value)}
            value={DOB}
          />
          <label className="L">Occupation</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setOccupation(e.target.value)}
            value={Occupation}
          />
          <label className="L"> Impression</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setImpression(e.target.value)}
            value={Impression}
          />
          <label className="L"> Subject to Learn</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setLSubject(e.target.value)}
            value={LSubject}
          />
          <label className="L">Topic to Learn</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setLTopic(e.target.value)}
            value={LTopic}
          />
          <label className="L">Timing to Learn</label>
          <input
            className="user-data"
            type="time"
            onChange={(e) => setLTiming(e.target.value)}
            value={LTiming}
          />
          <label className="L"> Subject to Teach</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setTSubject(e.target.value)}
            value={TSubject}
          />
          <label className="L">Topic to Teach</label>
          <input
            className="user-data"
            type="text"
            onChange={(e) => setTTopic(e.target.value)}
            value={TTopic}
          />
          <label className="L">Timing to Teach</label>
          <input
            className="user-data"
            type="time"
            onChange={(e) => setTTiming(e.target.value)}
            value={TTiming}
          />

          <button className="addme">Add me</button>
          {error && <div className="error">{error}</div>}
        </form>
        {isFormSubmitted && (
          <div className="popup">
            <div className="popup-inner form-popup">
              <button
                className="button-close popup-close"
                onClick={() => setIsFormSubmitted(false)}
              >
                Close
              </button>
              <div className="message">
                <h3>Submit successful!</h3>
              </div>
              <Link to="/home">
                <button className="smit redirect"> Home</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Form;
