import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup= ()=>{
    const [errors, setErrors]= useState(null)
    const[isLoading, setIsLoading]= useState(null)
    const {dispatch}=useAuthContext()

   const signup= async(email, password)=>{
    setIsLoading(true)
    setErrors(null)

    const response= await fetch (process.env.REACT_APP_API_URL+'/api/person/signup',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})    
    })  
    // console.log(Proxy)
    const json = await response.json()

    console.log(json)
    if(!response.ok){
        setIsLoading(false)
        setErrors(json.error)//check
    } 
    if(response.ok){
        //Save the user to lical storage
        localStorage.setItem('user', JSON.stringify(json))

        //update the authContext
        dispatch({type:'LOGIN', payload:json})
        setIsLoading(false)
    }
}
    return{signup, isLoading, errors}
}