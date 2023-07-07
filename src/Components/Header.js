import React,{useEffect} from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import './Header.css'
import Profile from './Profile'
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";

function Header(props) {
  const { user, isAuthenticated} = useAuth0();
  
  const navigate = useNavigate();
  const handleCreateQuiz = ()=>{
    navigate(`/create`);
  }
  useEffect(()=>{
    if( isAuthenticated)
    {
      localStorage.setItem("user" , JSON.stringify(user))
    }
  })
  return (
    <div className='header'>
        {isAuthenticated && <Button variant='outlined' onClick={handleCreateQuiz}>Create Quiz</Button>}
        {
          !isAuthenticated && <h3>Please login to create Quiz or give quiz</h3>
        }
        { !isAuthenticated && <LoginButton/>}
        { isAuthenticated && <LogoutButton/>}
        <Profile/>
    </div>
  )
}

export default Header