import React,{useEffect} from 'react'
import Header from './Header';
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/material';
import { ListItem,ListItemText,ListItemButton} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'
import { useSnackbar } from "notistack";
import config from '../config/config';

function HomePage() {
  const { enqueueSnackbar } = useSnackbar();

  const {isAuthenticated, user } = useAuth0();
  const [ loading, setloading] = React.useState(true)
  const [quizes,setQuizes] = React.useState([])
  const navigate = useNavigate()
  const makeApiCall = async ()=>{
    try{
      setloading(true)
      const response = await axios.get(`${config.endpoint}/user/quizes/${user.email}`)
      const quiz = response.data.quiz
      setQuizes(quiz)
      setloading(false)
     
    }
    catch(err)
    {
      enqueueSnackbar(err,{variant:"error"})
      console.log(err)
    }
  }
  const handleListClick=(id)=>{
      navigate(`/solve/${id}`)

  }
 
  useEffect(()=>{
    if(isAuthenticated)
      makeApiCall();
  },[isAuthenticated])

  return (
    <Box >
        <Header />
        <Box sx={{display:'flex', flexDirection:'column',alignItems:'center'}} >
        <h3>Your Quizes</h3>
        <Box className="quizname" >
          
          { isAuthenticated && !loading && quizes.length!==0 &&
            quizes.map((quiz)=>{
              return <ListItem onClick={()=>handleListClick(quiz._id)}  key={quiz._id} id={quiz._id} component="div" >
              <ListItemButton>
                <ListItemText primary={quiz.quizName} />
              </ListItemButton>
            </ListItem>
            })
        }
        
        </Box>
        </Box>
    </Box>
  )
}

export default HomePage