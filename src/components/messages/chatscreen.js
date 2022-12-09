import {useNavigate,useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './chat.css';
import * as service from "../../services/auth-service";

import * as messageService from "../../services/messages-service";
import * as starredService from "../../services/starred-service";
import { ChatMessage } from "./chat-message";

export const ChatScreen = () => {

    const {state} = useLocation();
    const [msgs, setMsgs] = useState(state.msg)
    const [strMsgs, setStrMsgs] = useState(state.stMs)
    const [user, setUsr] = useState(state.user)
    const [otherUser, setOtherUsr] = useState(state.otherUser)
    const [otherUsername, setOtherUsrname] = useState(state.otherUsername)

     

    
    const [newMessage, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);
      };

    const navigate = useNavigate()
    const navme = () => {
        navigate('/messages')
    }

    const sendMessage = (message) => {
        messageService.sendMessage(user, otherUser, {message})
            .then(msg => {
                // refresh messages
                messageService.findAllMessagesBetweenUsers(user, otherUser)
                    .then((ms) => {
                        setMsgs(ms)
                        setMessage('')
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));

    }

    return (
        <div>
            <div className="d-flex py-2 justify-content-between">
              <h1>Messages with @{otherUsername}</h1>
            </div>
            <button className="btn btn-primary back-btn" onClick={navme}>Back</button>
            
            <div className="mesgs border border-secondary rounded">
            
                <div className="msg_history">
                    {msgs && msgs.map(message => {

                        return (<><ChatMessage key={message.id} message={message} starred = {strMsgs} loginUser = {user}/></>)
                    }
                      )}
                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message" 
                    onChange={(handleChange)}
                    value={newMessage}/>
                    <button className="msg_send_btn" onClick={() => {
                        sendMessage(newMessage)
                    }}>&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};