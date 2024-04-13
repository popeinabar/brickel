import React, { createContext, useReducer, useEffect } from "react";

export const StudentContext = createContext();

const person=JSON.parse(localStorage.getItem('user'))
console.log(person.token)
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
    case 'UPDATE_STUDENTS':
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? { ...student, ...action.payload } : student
        ),
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
  const [state, dispatch] = useReducer(studentReducer, {
    students: [],
    loading: true,
  });

  useEffect(() => {
    console.log('use effect ran outside api')

    const fetchData = async () => {

      console.log('api is called in student context')

      const response = await fetch(process.env.REACT_APP_API_URL + "/api/user",{ headers:{
        'Authorization': `Bearer ${person.token}`
      }});

      const students = await response.json();
      
      console.log(students)
      if (response.ok) {
        console.log("after the respooince is ok",students)
        dispatch({ type: "SET_STUDENTS", payload: students });
      }
    };
    // Fetch data when component mounts and every time it updates
    if(person){
      fetchData();

    }
  }, [dispatch,person]);



console.log('student context: ',state)
  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
