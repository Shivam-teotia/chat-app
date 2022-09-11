import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChatContainer } from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { allUserRoute, host } from "../utils/APIRoutes";
import {io} from "socket.io-client";
const Chat = () => {
  const socket=useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [usLoaded, setusLoaded] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      setusLoaded(true);
    }
  }, []);
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
    if (currentUser) {
      if (currentUser.isAvatatImageSet) {
        fetchData();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {usLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-column: 35% 65%;
    }
  }
`;
export default Chat;
