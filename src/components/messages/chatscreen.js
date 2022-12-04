import {useNavigate,useLocation} from "react-router-dom";
import {useState} from "react";
import './chat.css';
import React from "react";
import * as service from "../../services/auth-service";

import * as messageService from "../../services/messages-service";
import { ChatMessage } from "./chat-message";

export const ChatScreen = () => {

    const {state} = useLocation();
    const [msgs, setMsgs] = useState(state.msg) 
    const [user, setUsr] = useState(state.user)
    const [otherUser, setOtherUsr] = useState(state.otherUser)
     

    const [newMessage, setMessage] = useState('');
    const handleChange = event => {
        setMessage(event.target.value);
      };

    const navigate = useNavigate()
    const navme = () => {
        navigate('/messages')
    }
    
    const sendMessage = (msg) => {
        // TODO: add message

        // refresh messages
        messageService.findAllMessagesBetweenUsers(user, otherUser)
            .then((ms) => {
                setMsgs(ms)
            })
            .catch(e => alert(e));


    }

    return (
        <div>
            <div className="d-flex py-2 justify-content-between">
              <h1>Messages</h1>
            </div>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-primary" onClick={navme}>Back</button>
                </div>
                <div className="col-2">
                    {/* give username here */}
                    <h2>@{otherUser}</h2>
                </div>
            </div>
            
            <div className="mesgs border border-secondary rounded">
            
                <div className="msg_history">
                    {/* map of messages */}
                    {/* pass the loggedInUser */}
                    {msgs && msgs.map(message =>
                      <ChatMessage key={message.id} message={message} loginUser = {user}/>)}
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