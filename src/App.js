import './App.css';
import CreateQuiz from './Components/CreateQuiz';
import HomePage from './Components/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="/create" element={<CreateQuiz/>} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <HomePage/>
    //   {/* <Question choices={["one","two","three","four"]} name={"hello"} /> */}
    // </div>
  );
}

export default App;
