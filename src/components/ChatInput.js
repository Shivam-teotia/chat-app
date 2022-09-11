import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [msg, setmsg] = useState("");
  const handleEmojiPicker = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    console.log(emoji.emoji);
    message += emoji.emoji;
    console.log(message);
    setmsg(message);
  };
  const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setmsg("");
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="type message here"
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 130%;
  align-items: center;
  padding: 0 0rem;
  padding-bottom: 0.3rem;
  .button-container {
    display: flex;
    align-items: center;
    color: transparent;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color:#080420;
        box-shadow:0 5px 10px #9a86f3;
        border-color:#9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color:white
            width:5px;
            &-thumb{
                background-color:white;
            }
        }
        .emoji-categories{
            button{
                filter:contrast(0);
            }
        }
        .emoji-search{
            background-color:transparent;
            border-color:#9186f3;
        }
        .emoji-group:before{
            background-color:#080420;
        }
      }
    }
  }
  .input-container {
    width: 70%;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    input {
      padding-left: 0.5rem;
      width: 90%;
      height: 5vh;
      font-size: 1.2rem;
      background-color: #ffffff34;
      outline: none;
      font-family: "Roboto";
      letter-spacing: 0.05rem;
      &::placeholder {
        color: white;
      }
      /*&:focus {
        background-color: wheat;
        color: black;
        &::placeholder {
          color: black;
        }
      }*/
      &:focus{
        color:white;
      }
    }
    button {
      padding: 0 2rem;
      height: 5vh;
      cursor: pointer;
      &:hover {
        background-color: wheat;
      }
    }
  }
`;
export default ChatInput;
