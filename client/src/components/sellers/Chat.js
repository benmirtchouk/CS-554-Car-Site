import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../firebase/Auth";

import React, { useContext, useEffect, useState, useRef } from "react";

import { pChat } from "../../data";


const Chat = () => {

    const location = useLocation();
    const { sellerId } = location.state;
    const { currentUser } = useContext(AuthContext);

    const [prevMessages, setPrevMessages] = useState([]);
    const [isSent, setIsSent] = useState(false);

    const clientId = currentUser.uid;
    // console.log(clientId);

    const room = clientId < sellerId ? `${clientId}++${sellerId}` : `${sellerId}++${clientId}`;

    const current_username = currentUser.displayName ?? currentUser.email;

    useEffect(() => {

        async function getPrevChats() {
            const { data, status } = await pChat.getPrivateMessageThread(room);
            if (status >= 400 || !data) {
                alert("getPrevChats failed");
                return;
            }
            setPrevMessages(data);
        }
        getPrevChats();
    }, []);

    console.log(prevMessages);

    const onMessageSubmit = (e) => {
        e.preventDefault();
        const msgEle = document.getElementById('message');
        const time = new Date().toLocaleTimeString();
        const message = `${time} : <${current_username}> ${msgEle.value}`;
        msgEle.value = '';
        msgEle.focus();
        pChat.postPrivateMessage(room, message);
        setIsSent(true);
    }

    return (
        <div className="main_layout">
            <div className="main-chat-body">
                <h1>send A private message to this seller</h1>
                <div className="chat-container">
                    <div className="chatlog">
                        {prevMessages.map((message, index) => (
                            <div key={index}>
                                <p>
                                    {message}
                                </p>
                            </div>
                        ))}
                    </div>
                    {!isSent ?
                        (<form onSubmit={onMessageSubmit}>
                            <input
                                name="message"
                                id="message"
                                variant="outlined"
                                label="Message"
                            />
                            <button type="submit" id="send-message">Send Message</button>
                        </form>)
                        :
                        (
                            <div>
                                Your message has been sent!
                            </div>
                        )}
                </div>
            </div>
        </div >

    )

}

export default Chat;