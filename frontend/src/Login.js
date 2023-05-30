import React from 'react'
import './Login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from './hooks/useLogin'


const Login = () => {
  

  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const {login, errors, isLoading}= useLogin()
 



  const handleSumbitLogin= async(e)=>{
    e.preventDefault()
    await login(email, password)
   
  }


  return (
   <>
   <div className='login'>
        <div className='ext-right'>
            <p className='moto'>

              Brickel is a community-driven platform that enables the exchange of educational resources and services without the use of money, creating a more accessible and equitable way for people to access education.
            </p>
            <form className='login' onSubmit={handleSumbitLogin}>
            <div className='login-form'>
              <h1>LOGIN</h1>
 
              <input className='log-email' type='email' placeholder='Email' onChange={(e)=> setEmail(e.target.value)} value={email}></input>
              <input className='pass' type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} value={password}></input>

              {/* <Link to={'/home'}> */}
                  <button className='Register' disabled={isLoading}>
                    Login
                  </button>
                  {errors && <div className='error'>{errors}</div>}
              {/* </Link>  */}
 
              <Link to={'/form'}>
                  <button className='Register'>
                    Register here
                  </button>
              </Link>
            </div>

            </form>
          
        </div>
      </div>
   
  </>
  )
}

export default Login