import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/download.jpg";
function Contacts({ contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Quick Talks</h3>
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  width:24vw;
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
  display:grid;
  grid-template-rows:10% 15% 75%;
  overflow:hidden;
  background-color:#080420;
  .brand{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    img{
      border-radius:0.8rem;
      height:2rem;
    }
  }
  .contacts{
    width:25vw;
    margin-top:1rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:grey;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .contact{
      display:flex;
      background-color:rgb(11, 49, 54);
      border-radius:0.6rem;
      min-height:5rem;
      padding:0.5rem;
      width:90%;
      transition:all 0.3s ease-in-out;
      .avatar{
        display:flex;
        align-items:center;
        img{
          cursor:pointer;
          height:3rem;
        }
      }
      .username{
        display:flex;
        text-transform:capitalize;
        font-family:'Roboto';
        font-size:1.1rem;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        padding-left:1rem;
        h3{
          cursor:pointer;
        }
      }
    }
    .selected{
      background-color:rgb(51, 49, 54);
      transform:scale(1.05);
    }
  }
  .current-user{
    margin-top:1rem;
    width:20vw;
    display:flex;
    justify-content:center;
    align-items:center;
    .avatar{
      img{
        height:4rem;
      }
    }
    .username{
      h2{
        margin-left:1rem;
        text-transform:capitalize;
      }
    }
  }
`;
export default Contacts;
