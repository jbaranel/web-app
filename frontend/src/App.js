import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login';
import Feed from './pages/Feed'
import Profile from "./pages/Profile";
import './App.css';
import NavBar from "./components/NavBar"


function App() {
  return (
    <>
    <NavBar/>
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/feed" element={<Feed/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
