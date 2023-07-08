import './App.css';
import CreateQuiz from './Components/CreateQuiz';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizComponent from './Components/QuizComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="/create" element={<CreateQuiz/>} />
      <Route path="/solve/:id" element={<QuizComponent/>} />
      
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
