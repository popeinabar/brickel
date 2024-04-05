import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { StudentContextProvider } from './context/StudentContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<StudentContextProvider>
    <AuthContextProvider>
    <BrowserRouter>
    <App /> 
    </BrowserRouter>
    </AuthContextProvider>
</StudentContextProvider>
   
);


