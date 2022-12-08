import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './chat.css';
import React from "react";
import * as service from "../../services/auth-service";

export const ChatMessage = ({message, loginUser}) => {
    const [isShown, setIsShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const formatDate = (dateString) => {
        const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    const isLoggedInUser = loginUser == message.from._id;
      
    return (
        
        <>
            {!isLoggedInUser && 
                <div class="incoming_msg">
                            <div class="incoming_msg_img"> 
                                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> 
                            </div>
                            <div class="received_msg">
                                <div class="received_withd_msg" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                                    <p>{message.message}</p>
                                    
                                    <div class="d-flex">
                                        <div className="mr-auto p-2"><span class="time_date">{formatDate(message.sentOn)}</span></div>
                                        {isShown && (<>
                                        <div className="p-2"><span><i class="fa fa-star" aria-hidden="true"></i></span></div>
                                        </>)}
                                    
                                    </div>
                                </div>
                            </div>
                </div>
            }
            {
             isLoggedInUser  && 
                <div class="outgoing_msg">
                            <div class="sent_msg" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                            {!isEdit && (<span class="time_date"><p>{message.message}</p></span>)}
                            {isEdit && (<input type="text" class="form-control" placeholder={message.message}/>)}
                                
                                <div class="d-flex">
                                    <div className="mr-auto p-2">
                                        <span class="time_date">{formatDate(message.sentOn)}</span>
                                    </div>
                                    {isShown && (<><div className="p-2"><span><i class="fa fa-star" aria-hidden="true"></i></span></div>
                                    {!isEdit && (
                                        <div className="p-2" onClick={() => setIsEdit(true)}>
                                            <span><i class="fa fa-pencil" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>)}
                                        {isEdit && (
                                        <div className="p-2" onClick={() => setIsEdit(false)}>
                                            <span><i class="fa fa-close" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>)}    
                                        
                                        </>)}
                                    
                                </div>
                            </div>
                </div>
            }
            
            
                    
        </>
        
    );
};