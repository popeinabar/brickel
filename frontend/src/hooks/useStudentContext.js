import { StudentContext } from "../context/StudentContext";
import { useContext } from "react";

export const useStudentContext=()=>{
    const context=useContext(StudentContext)

    if(!context){
        throw Error('usecontext should be inside context provider ')
    }

    return context
}