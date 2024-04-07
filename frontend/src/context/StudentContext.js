import React, { createContext, useReducer, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

export const StudentContext = createContext();

export const studentReducer = (state, action) => {
 
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case "CREATE_STUDENTS":
      return {
        ...state,
        students: [action.payload, ...state.students],
      };
    case "FETCH_BLOGS_START":
      return {
        ...state,
        loading: true, // Set loading to true when fetching starts
      };
    case "FETCH_BLOGS_END":
      return {
        ...state,
        loading: false, // Set loading to false when fetching ends
      };
    default:
      return state;
  }
};

export const StudentContextProvider = ({ children }) => {

    
  const {user}=useAuthContext()
  const [state, dispatch] = useReducer(studentReducer, {
    students: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_BLOGS_START" }); // Set loading to true before fetching
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/api/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_STUDENTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch({ type: "FETCH_BLOGS_END" }); // Set loading to false after fetching
      }
    };
    
    // Fetch data when component mounts
    fetchData();
  }, []);

  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
  
};
