import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BiLogOutCircle} from 'react-icons/bi';
const Logout = () => {
    const navigate=useNavigate();
    const handleClick=async ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <BiLogOutCircle/>
    </Button>
  )
}

const Button=styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    padding:0.5rem;
    background-color:grey;
    border-radius:0.5rem;
    border:none;
    cursor:pointer;
    svg{
        font-size:1.5rem;
        color:white;
        transition:0.1s ease-in-out;
        &:hover{
            transform:scale(1.2);
        }
    }
`;
export default Logout