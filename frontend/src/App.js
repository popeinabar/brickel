import { Route, Routes,Navigate } from 'react-router-dom';
import Home from './Home';
import Learn from './Learn';
import About from './About';
import Teach from './Teach';
import './App.css';
import NavBar from './component/NavBar';
import User from './User';
import Login from './Login';
import Footer from './component/Footer';
import Form from './Form'
// import StudentContextWrapper from './component/StudentWrapperC.js'
import { useAuthContext } from "./hooks/useAuthContext.js";


const App = ()=>{
  const {user}= useAuthContext()
  return (
    
    <>
    {user && (
    <NavBar/>
  )}
    <Routes>
    <Route path='/'  element={user ? <Home />: <Navigate to='/login'/>}  />
    <Route path='/form'  element={<Form/>} />
    <Route path='/home'  element={user ? <Home />: <Navigate to='/login'/>} />
    <Route path='/learn'  element={user ? <Learn />: <Navigate to='/home'/>} />
    <Route path='/teach' element={user ? <Teach />: <Navigate to='/home'/>} />
    <Route path='/about' element={user ? <About />: <Navigate to='/home'/>} />
    <Route path='/user' element={user ? <User />: <Navigate to='/home'/>} />
    <Route path='/login' element={!user ? <Login />: <Navigate to='/home'/>}  />
 
    {/* <StudentContextWrapper/> */}
    </Routes>
    {user && (
      <Footer/>
  )}
    </>
  );
}

export default App;
  