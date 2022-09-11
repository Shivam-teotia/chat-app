import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";
export const ChatContainer = ({ socket, currentChat, currentUser }) => {
  //console.log(currentChat);
  const [messages, setmessages] = useState([]);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    if (currentChat) {
      async function fetchData() {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setmessages(response.data);
      }
      fetchData();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    //alert("message");
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: false, message: msg });
    setmessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      
      socket.current.on("msg-receive", (msg) => {
        console.log("message",msg);
        setarrivalMessage({ fromSelf: true, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "received" : "sended"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chat-input">
            <ChatInput handleSendMsg={handleSendMsg} />
          </div>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  margin-left: 4rem;
  padding-top: 1rem;
  display:grid;
  grid-template-rows:15% 75% 10%;
  overflow:hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-rows: 15% 75% 15%;
    }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        text-transform: capitalize;
        font-size: 1.1rem;
      }
    }
  }
  .chat-messages{
    height:90%;
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    overflow:auto;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:#ffffff39;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .message{
      display:flex;
      align-items:center;
      .content{
        background-color:rgb(35, 15, 74);
        max-width:40%,
        overflow-wrap:break-word;
        padding:0.8rem;
        font-size:1.1rem;
        border-radius:1rem;
      }
    }
    .sended{
      justify-content:flex-end;
      .content{
        background-color:#4f04ff21;
      }
    }
  }
`;
