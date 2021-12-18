import React, { useContext, useEffect } from "react";
// import io from 'socket.io-client';
import { AuthContext } from "../../firebase/Auth";
import { SocketContext } from "../../socket";


const MessageBoard = () => {

  const auth = useContext(AuthContext);
  const userName = auth.currentUser.displayName;
  console.log(auth);

  const socket = useContext(SocketContext);
  console.log("socket", socket);

  // join room in useEffect
  // const socketRef = useRef();

  // const room = `${userName}--with--${sellerName}`;

  useEffect(() => {
    // socketRef.current = io('/');
    console.log("use Effect fired");
    socket.emit('join', userName);
    // socketRef.current.emit('join', room);
    // socketRef.current.onAny((event, ...args) => {
    //   console.log(event, args);
    // });

    return () => {
      // socketRef.current.disconnect();
    };
  }, [socket, userName]);

  // useEffect(() => {
  //   socketRef.current.on('message', (message) => {
  //     console.log(message);
  //   });
  // })


  const onMessageSubmit = (e) => {
    e.preventDefault();
    const msgEle = document.getElementById('message');
    console.log(`${msgEle.value} received`);
    // socketRef.current.emit('message', msgEle.value);
    msgEle.value = '';
    msgEle.focus();
  }


  return (
    <div className="main_layout">
      <div className="mainbody">
        <h1>MessageBoard</h1>
        <br />
        <br />

        <p>User: {userName}</p>
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
