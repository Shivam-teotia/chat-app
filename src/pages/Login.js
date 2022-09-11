import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//import Login from "../pages/Login";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/download.jpg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
const Login = () => {
  const navigate=useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions={
    position:"top-right",
    autoClose:7000,
    pasuseOnHover:true,
    draggable:true,
    them:'dark',
  }
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate("/");
    }
  },[])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      //console.log("in validation ",registerRoute);
      const {password,username}=values;
      const {data}=await axios.post(loginRoute,{
        username,
        password, 
      });
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
        navigate("/"); 
      }
    }
  };
  const handleValidation = (event) => {
    const { password,username} = values;
    if (password==="") {
      toast.error("Email and Password is required ",toastOptions);
      return false;
    }
    else if(username.length===0){
      toast.error("Email and Password is required",toastOptions);
      return false;
    }
    else if(password.length<8){
      toast.error("Password should be greater than or equal to 8 characters",toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt=""></img>
            <h1>Hello Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => handleChange(event)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an Account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 6rem;
      border-radius:4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 500px;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 4rem 4rem;
    input {
      background-color: transparent;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1.5px solid white;
      color: white;
      font-size: 1rem;
      letter-spacing: 0.08rem;
      width: 100%;
      &:focus {
        border: 1px solid white;
        outline: none;
        background-color: white;
        color: black;
      }
    }
    button {
      padding: 0.4rem;
      background-color: grey;
      color: white;
      letter-spacing: 2px;
      border: none;
      text-transform: uppercase;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      transition: all 0.4s;
      &:hover {
        background-color: white;
        color: black;
      }
    }
    span {
      color: white;
    }
    a {
      color: rgb(81, 97, 240);
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
export default Login;
