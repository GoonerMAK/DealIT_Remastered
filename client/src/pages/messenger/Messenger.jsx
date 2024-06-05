import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
import Announcement from "../../components/Announcement";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from "axios";
import { io } from "socket.io-client";
import Navbar from "../../components/Navbar";
import { useLocation , Link} from "react-router-dom";
import React from 'react'


const Messenger =()=> {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  // const { user } = useAuthContext()
  const scrollRef = useRef();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const data = params.get('data');

  const upperuser = JSON.parse(localStorage.getItem('user'))
  const user=upperuser.user

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      if(data){
        var newchat=false;
        try {
          const res = await axios.get(`http://localhost:3000/api/conversations/find/${data}/${user._id}`);
          setCurrentChat(res.data);
          if(res.data!=null){
            newchat=false
          }else{
            newchat=true
          }
        } catch (err) {
          console.log(err);
        }
        //if no previous convo, post convo
        if(newchat){
          const receiverId=data
          const senderId=user._id
          if(receiverId!=senderId){
            try {
              console.log("posting new chat")
              const res = await axios.post('http://localhost:3000/api/conversations/', {senderId, receiverId});
              console.log("for new chat", res.data)
              setCurrentChat(res.data);
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      try {
        const res = await axios.get('http://localhost:3000/api/conversations/' + user._id);
        setConversations(res.data);
        console.log("for conversation",res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/messages/' + currentChat?._id);
        console.log("for message", res.data)
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post('http://localhost:3000/api/messages', message);
      console.log("another messege", res.data)
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Announcement />
      <Navbar/>
      <div className="messenger">
        
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <h3 className="chatMenuInput">Available Conversations</h3>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline"> */}
          {/* <div className="chatOnlineWrapper"> */}
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}
export default Messenger