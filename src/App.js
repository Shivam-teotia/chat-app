import React from 'react'
import {BrowserRouter ,Route,Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from './pages/SetAvatar';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="login" element={<Login/>}></Route>
        <Route exact path="/setAvatar" element={<SetAvatar/>}></Route>
        <Route exact path="/" element={<Chat/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;