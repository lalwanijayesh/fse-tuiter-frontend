import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './chat.css';
import React from "react";
import * as service from "../../services/auth-service";

export const ChatMessage = ({message, loginUser}) => {
    const formatDate = (dateString) => {
        const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    const isLoggedInUser = loginUser == message.from;
      
    return (
        
        <>
            {!isLoggedInUser && 
                <div class="incoming_msg">
                            <div class="incoming_msg_img"> 
                                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
                            </div>
                            <div class="received_msg">
                                <div class="received_withd_msg">
                                <p>{message.message}</p>
                                <span class="time_date">{formatDate(message.sentOn)}</span></div>
                            </div>
                </div>
            }
            {
             isLoggedInUser  && 
                <div class="outgoing_msg">
                            <div class="sent_msg">
                                <p>{message.message}</p>
                                <span class="time_date">{formatDate(message.sentOn)}</span>
                            </div>
                </div>
            }
            
            
                    
        </>
        
    );
};