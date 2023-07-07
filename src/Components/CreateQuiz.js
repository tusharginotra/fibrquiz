import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import './CreateQuiz.css'
import axios from 'axios';

function CreateQuiz() {
    const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [quizName, setQuizname] = useState('')
  const [user,setUser]=useState()
    // const [correctAnswer, setCorrectAnswer] = useState([])
  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...choices];
    updatedOptions[index] = e.target.value;
    setChoices(updatedOptions);
  };

  const handleCorrectOptionChange = (e, index) => {
    const selectedOptions = [...correctAnswer];
    if (e.target.checked) {
      selectedOptions.push(index);
    } else {
      const indexToRemove = selectedOptions.indexOf(index);
      if (indexToRemove !== -1) {
        selectedOptions.splice(indexToRemove, 1);
      }
    }
    setCorrectAnswer(selectedOptions);
  };

  const addQuestion = () => {
    const question = {
      question: currentQuestion,
      choices: choices.filter(option => option !== ''),
      correctAnswer: correctAnswer
    };
    alert("question added")
    setQuestions(prevQuestions => [...prevQuestions, question]);
    setCurrentQuestion('');
    setChoices(['', '', '', '']);
    setCorrectAnswer([]);
    
  };

  const handleSubmit = async () => {
    const quizData = {
      quizName : quizName,
      creator : user.email,
      questions: questions
    };
    const bodyData = {
      email : user.email,
      name : user.name,
      quiz : quizData
    }
    
    try{
      const response = await axios.post("http://localhost:8082/newquiz", bodyData)
      console.log("response arrived",response)
      setCurrentQuestion('');
      setChoices(['', '', '', '']);
      setCorrectAnswer([]);
      setQuestions([])
      setQuizname('')
      // window.location.reload()
    }
    catch(err)
    {
      console.log("error occured",err)  
    }
    // Send quizData to the backend
    // console.log(bodyData);
  };
  useEffect(()=>{
    const item = JSON.parse(localStorage.getItem("user"))
    console.log(item)
    setUser(item)
    // console.log(user)
  },[])
  return (
    <div >
        <Box className="quiz">
      <Typography variant="h6">FibrQuiz</Typography>
      <TextField
          label="Quiz Name"
          value={quizName}
          onChange={ event => setQuizname(event.target.value)}
          // fullWidth
          margin='normal'
        />
      <div>
        
        <TextField
          label="Question"
          value={currentQuestion}
          onChange={handleQuestionChange}
          fullWidth
          margin="normal"
        />

        <Typography variant="subtitle1">Choices:</Typography>

        <FormGroup>
          {choices.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <TextField sx={{margin:1}}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              }
              label={`  ${index + 1}`}
            />
          ))}
        </FormGroup>

        <Typography variant="subtitle1">Correct choices:</Typography>

        <FormGroup sx={{alignContent:'center'}}>
          {choices.map((option, index) => (
            <FormControlLabel 
              key={index}
              control={
                <Checkbox
                  checked={correctAnswer.includes(index)}
                  onChange={(e) => handleCorrectOptionChange(e, index)}
                />
              }
              label={`Option ${index + 1}`}
            />
          ))}
          <Button variant="contained" color="primary" onClick={addQuestion}>
          Add Question
        </Button>
        </FormGroup>

        
      </div>

      <Button sx={{margin: '1rem'}} variant="contained" color="secondary" onClick={handleSubmit}>
        Submit Quiz
      </Button>
      </Box>
    </div>

  )
}

export default CreateQuiz