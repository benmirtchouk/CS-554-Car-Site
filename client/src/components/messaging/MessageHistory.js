import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';

import { gChat } from "../../data";
import Loading from '../Loading';

const MessageHistory = () => {

    const [chatHistory, setChatHistory] = useState({ loading: true, chatLogs: [] });
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        async function getChatHistory() {
            const { data, status } = await gChat.getAllGlobalChats();
            if (status >= 400 || !data) {
                alert("getAllGlobalChats call failed");
                return;
            }
            const allChats = data.map(chatObj => chatObj.chat);
            setChatHistory({ loading: false, chatLogs: allChats });
        }
        getChatHistory();
    }, []);


    useEffect(() => { scrollToBottom() }, [chatHistory]);

    if (chatHistory.loading) {
        return <Loading />;
    }

    if (chatHistory.chatLogs.length === 0) {
        return (
            <div>
                No one talked yet!
            </div>
        );
    }

    return (
        <div className="main_layout">
            <div className="main-chat-body">
                <h1>All Chat History</h1>
                <br />
                <p>Updated at: {new Date().toLocaleTimeString()}</p>

                <br />
                <Link to={"/message_board"}>Live Messages</Link>
                <br />

                <div className="chat-container">
                    <div className="chatlog" ref={chatEndRef}>
                        {chatHistory.chatLogs.map((message, index) => (
                            <div key={index}>
                                <p>
                                    {message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );



}

export default MessageHistory;