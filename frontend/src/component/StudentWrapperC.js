import React from 'react';
import { AuthContextProvider } from './AuthContextProvider'; // Import AuthContextProvider
import { StudentContext } from '../context/StudentContext';


const StudentContextWrapper=()=>{
    <AuthContextProvider>
        <StudentContext/>
    </AuthContextProvider>
}