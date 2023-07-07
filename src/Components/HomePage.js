import React,{useEffect} from 'react'
import Header from './Header';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
function HomePage() {
  const { user, isAuthenticated } = useAuth0();
  const [quizes,setQuizes] = React.useState([])
  const makeApiCall = async ()=>{
    try{
      const response = await axios.get(`http://localhost:8082/user/quizes/${user.email}`)
      console.log(response);
    }
    catch(err)
    {
      console.log(err)
    }
  }
  useEffect(()=>{
    if( isAuthenticated)
    {
      makeApiCall();
    }
  })
  return (
    <div>
        <Header />
        {/* <DialogBox open={open} /> */}
    </div>
  )
}

export default HomePage