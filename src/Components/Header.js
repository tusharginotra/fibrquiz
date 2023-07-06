import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { Button } from '@mui/material'
import './Header.css'
import Profile from './Profile'
function Header() {
  return (
    <div className='header'>
        <Button>Create Quiz</Button>
        <LoginButton/>
        <LogoutButton/>
        <Profile/>
    </div>
  )
}

export default Header