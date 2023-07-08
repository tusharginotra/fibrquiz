import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Quiz from './Quiz'
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";
import { useSnackbar } from 'notistack'
import Header from './Header'
import config from '../config/config'
function QuizComponent() {
  const {enqueueSnackbar} = useSnackbar()
    const { user, isAuthenticated} = useAuth0();
    const [questions,setQuestions]=useState([])
    const [ loading,setLoading] = useState(true)
    const {id} = useParams()
    const makeApiCall =async ()=>{
      try{
          const response = await axios.get(`${config.endpoint}/quizes/${id}`)
          const data = response.data.quiz.questions
          setQuestions(data)
      }
      catch(err)
      {
        enqueueSnackbar(err,{variant:"error"})
          console.log(err)
      }
  }
  useEffect(()=>{

    setLoading(true)
    makeApiCall()
    setLoading(false)
},[id])
  return (
    <div>
        {!isAuthenticated && <Header/>}
        { isAuthenticated && !loading && questions.length!==0 && <Quiz id={id} user={user} questions={questions} />}
    </div>
  )
}

export default QuizComponent