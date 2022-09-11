import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"
function Welcome({currentUser}) {
  //console.log(currentUser.username);
  return (
    <Container>
        <img src={Robot} alt="Robot"/>
        <h1>
            Welcome <span>{currentUser.username}</span>
        </h1>
        <h3>Select contact to start chat</h3>
    </Container>
  )
}
const Container=styled.div`
    margin-left:2.5rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color:wheat;
    color:black;
`;
export default Welcome