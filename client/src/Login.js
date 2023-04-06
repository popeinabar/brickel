import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
   <>
   <div className='login'>
        <div className='ext-right'>
            <p className='moto'>

              Brickel is a community-driven platform that enables the exchange of educational resources and services without the use of money, creating a more accessible and equitable way for people to access education.
            </p>
            
            <div className='login-form'>
              <h1>LOGIN</h1>

              <input className='log-email' type='text' placeholder='Email'></input>
              <input className='  pass' type='text' placeholder='Password'></input>

              <Link to={'/form'}>
                  <button className='Register'>
                    Register here
                  </button>
              </Link>
            </div>
           
          
        </div>
      </div>
   
  </>
  )
}

export default Login