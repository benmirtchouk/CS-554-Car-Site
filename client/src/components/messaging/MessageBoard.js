import React, { useContext, useEffect, useState, useRef } from "react";
// import io from 'socket.io-client';
import { AuthContext } from "../../firebase/Auth";

const MessageBoard = (props) => {
  const [ chat, setChat ] = useState([]);
  const chatRef = useRef([]);
  
  const { currentUser } = useContext(AuthContext);
  const { socket } = props;

  const current_username = currentUser.displayName ?? currentUser.email;
  const uid = currentUser.uid;

  console.log('cur', currentUser);
  console.log('socket', socket);

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  useEffect(() => {
    const add_chat = (username, message) => {
      // We cannot just update the ref to 'chat' because changes to it will not trigger a re-render
      // Thus we change the state 'chat' and later (above useEffect) waterfall this change to the ref
      setChat([ ...chatRef.current, { username, message } ]);
    };
    
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
  }, [socket, uid]);

  // useEffect(() => {
  //   socketRef.current.on('message', (message) => {
  //     console.log(message);
  //   });
  // })


  const onMessageSubmit = (e) => {
    e.preventDefault();
    const msgEle = document.getElementById('message');
    console.log(`${msgEle.value} received`);
    socket.emit('message', { uid, username: current_username, message: msgEle.value });
    msgEle.value = '';
    msgEle.focus();
  }


  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>MessageBoard</h1>
        <br />
        <br />

        <p>User: {current_username}</p>
        <div id="chatlog">
          { chat.map(({ username, message}, index) => (
            <div key={index}>
              <h3>
                {username}: <span>{message}</span>
              </h3>
            </div>
          )) }
        </div>
        <form onSubmit={onMessageSubmit}>
          <div>
            <input
              name="message"
              id="message"
              variant="outlined"
              label="Message"
            />
          </div>
          <button type="submit" id="send-message">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default MessageBoard;
