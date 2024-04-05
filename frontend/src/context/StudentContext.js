import {  createContext, useReducer } from "react";

export const StudentContext=createContext()

export const studentReducer=(state,action)=>{
    switch (action.type) {
        case 'SET_ STUDENTS':
          return {

            students: action.payload,

          };
        case 'CREATE_STUDENTS':
          return {

            students: [action.payload, ...state.students],
          };
       default:
          return state;
      }
    };


export const StudentContextProvider=({children})=>{
    const[state,dispatch]=useReducer(studentReducer,{
        students:null,

    })

    return(
        <StudentContext.Provider value={{...state, dispatch}}>
            { children }
        </StudentContext.Provider> 
    )
} 