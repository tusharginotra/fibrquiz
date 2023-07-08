import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { FormGroup,FormControlLabel,Checkbox ,Button} from '@mui/material'
import './Quiz.css'
import { useSnackbar } from 'notistack'
import config from '../config/config'


function Quiz(props) {
  const { enqueueSnackbar } = useSnackbar();

    const user = props.user
    const id = props.id

    const questions= props.questions

    const [currentQuestion,setCurrentQuestion] = useState(0)

    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [isCorrect,setIsCorrect] = useState(false)
    const [score,setScore] = useState(0)
    const [showResult,setShowResult] = useState(false)
    const {question,choices, correctAnswer} =questions[currentQuestion]
    const navigate = useNavigate()

    const handleCorrectOptionChange = (e, index) => {
        const selectedOptions = [...correctAnswers];
        if (e.target.checked) {
          selectedOptions.push(index);
        } else {
          const indexToRemove = selectedOptions.indexOf(index);
          if (indexToRemove !== -1) {
            selectedOptions.splice(indexToRemove, 1);
          }
        }
        setCorrectAnswers(selectedOptions);
    
        if( JSON.stringify(selectedOptions) === JSON.stringify(correctAnswer))
        {
         
            setIsCorrect(true)
        }
        else
        {
         
          setIsCorrect(false)
        }
      
      };
      const sendScore = async(score)=>{
        try{
          const response = await axios.post(`${config.endpoint}/solvequiz`,{
          id : id,
          name : user.name,
          email : user.email,
          score : score
        })
        if( response.data.result.message)
        {
          const message = response.data.result.message
          enqueueSnackbar(message,{variant:"error"})
          
        }
        else
        {
          enqueueSnackbar(response.data.message,{variant:"success"})
        }
      }
        catch(err)
        {
          enqueueSnackbar(err,{variant:"error"})
          console.log(err);
        }
        

      }
      const onClickNext=()=>{
        setCorrectAnswers([])
        if( isCorrect)
        {
          setScore((prev)=>prev+1);
          setIsCorrect(false)
        }
        if( currentQuestion !== questions.length-1)
        {
          setCurrentQuestion((prev)=>prev+1);
        }
        else
        {
          sendScore(score);
          setCurrentQuestion(0)
          setShowResult(true )
        }
      }
    

    
    

  return (
    <div className='quiz-container'>
      
      <div className='quiz'>
        {
          !showResult ? ( <>
            <span className='active-question-no'>{currentQuestion+1}</span>
            <span className='total-questions'>/{questions.length}</span>
            <h2>{question}</h2>
            <FormGroup sx={{alignContent:'center'}}>
          {choices.map((option, index) => (
            <FormControlLabel 
              key={index}
              control={
                <Checkbox
                  checked={correctAnswers.includes(index)}
                  onChange={(e) => handleCorrectOptionChange(e, index)}
                />
              }
              label={`${option}`}
            />
          ))}   
          <Button disabled={correctAnswers.length=== 0?true : false} onClick={onClickNext}>{currentQuestion===questions.length-1 ? "Finish" : "Next" }</Button>
          </FormGroup>
            </>) : <div className='Result'>
            <h3>Result</h3>
            <p>Score is : {score}</p>
            <p>Total Questions : {questions.length}</p>
            <Button onClick={()=>navigate("/")} >Go to Home page</Button>

            </div> 
        }
           
        
        </div> 
      
        

    </div>
  )
}

export default Quiz