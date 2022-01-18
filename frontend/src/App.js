import Register from './pages/Register'
import Home from './pages/Home'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
