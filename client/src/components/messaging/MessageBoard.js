import React, { useContext, useEffect, useState, useRef } from "react";
// import io from 'socket.io-client';
import { AuthContext } from "../../firebase/Auth";

const MessageBoard = (props) => {
  const [ chat, setChat ] = useState([]);
  const chatRef = useRef([]);
  const chatEndRef = useRef(null)
  
  const { currentUser } = useContext(AuthContext);
  const { socket } = props;

  const current_username = currentUser.displayName ?? currentUser.email;
  const uid = currentUser.uid;

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const add_chat = (username, message) => {
    // We cannot just update the ref to 'chat' because changes to it will not trigger a re-render
    // Thus we change the state 'chat' and later (above useEffect) waterfall this change to the ref
    const time = new Date().toLocaleTimeString();
    setChat([ ...chatRef.current, { time, username, message } ]);
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    socket.emit('user_join_leave', { uid, username: current_username, joined: true } );

    socket.on('message', ({ username, message }) => {
      add_chat(username, message);
    });
    socket.on('user_join_leave', ({ username, joined }) => {
      add_chat(`${username}`, `Has ${joined ? 'joined' : 'left'} the chat`);
    });

    return () => {
      socket.emit('user_join_leave', { uid, username: current_username, joined: false } );
    }
  }, [socket, uid, current_username]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const msgEle = document.getElementById('message');
    socket.emit('message', { uid, username: current_username, message: msgEle.value });
    add_chat(current_username, msgEle.value);
    msgEle.value = '';
    msgEle.focus();
  }

  return (
    <div className="main_layout">
      <div className="main-chat-body">
        <h1>MessageBoard</h1>
        <br />
        <br />
        
        <div className="chat-container">
          <div className="chatlog" ref={chatEndRef}>
            { chat.map(({ time, username, message}, index) => (
              <div key={index}>
                <p>
                  {`${time}: <${username}> `}<span>{message}</span>
                </p>
              </div>
            )) }
          </div>
          <form onSubmit={onMessageSubmit}>
            <label htmlFor="message" className="screen-reader-only-label">
              Message
            </label>
            <input
              name="message"
              id="message"
              variant="outlined"
              label="Message"
            />
            <button type="submit" id="send-message">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageBoard;
