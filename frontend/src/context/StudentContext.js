import {  createContext, useReducer } from "react";

export const StudentContext=createContext()

export const studentReducer=(state,action)=>{
    switch (action.type) {
        case 'SET_STUDENTS':
          return {
            ...state,
            students: action.payload,
            loading: false,
          };
        case 'CREATE_STUDENTS':
          return {
            ...state,
            students: [action.payload, ...state.students],
          };

          case 'FETCH_BLOGS_START':
            return {
              ...state,
              loading: true, // Set loading to true when fetching starts
            };
          case 'FETCH_BLOGS_END':
            return {
              ...state,
              loading: false, // Set loading to false when fetching ends
            };
       default:
          return state;
      }
    };


export const StudentContextProvider=({children})=>{
    const[state,dispatch]=useReducer(studentReducer,{
        students:[],
        loading:true,
    })

    return(
        <StudentContext.Provider value={{...state, dispatch}}>
            { children }
        </StudentContext.Provider> 
    )
} 