import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login';
import Feed from './pages/Feed'
import PostPage from './pages/PostPage'
import UserPage from "./pages/UserPage";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute"
import './App.css';
import NavBar from "./components/NavBar"


function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
        <Route path="/home" element={<Home/>} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/post/:post_id" element={<PostPage/>} />
        <Route path="/user/:username" element={<UserPage/>} />
        <Route path="/profile" element={<Profile/>} />
      </Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
