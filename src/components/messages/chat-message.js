import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './chat.css';
import React from "react";
import * as service from "../../services/starred-service";
import * as messageService from "../../services/messages-service";

export const ChatMessage = ({message, loginUser}) => {
    const [isShown, setIsShown] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [msg, setMsg] = useState(message);

    const [msgVal, setMsgVal] = useState(msg.message);
    const handleChange = event => {
        setMsgVal(event.target.value);
      };

    const formatDate = (dateString) => {
        const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
    const starMessage = (message, currUser) => {
        service.userStarsMessage(currUser, message._id)
        .then()
    }
    const updateCurrMessage = (mid, message) => {
        // console.log(mid)
        // console.log(message)
        messageService.updateMessage(mid, {message})
        .then((m) => {

            if (m.acknowledged === true) {
                setIsEdit(false)
                // todo: code for updating the message
                
                //update the input text
                setMsgVal(message)

            }
            
        })
    }

    //   console.log(message)
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
                                    <p>{msg.message}</p>
                                    
                                    <div class="d-flex">
                                        <div className="mr-auto p-2"><span class="time_date">{formatDate(msg.sentOn)}</span></div>
                                        {isShown && (<>
                                        <div className="p-2" onClick={() => starMessage(msg, loginUser)}><span><i class="fa fa-star" aria-hidden="true"></i></span></div>
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
                            {!isEdit && (<span class="time_date"><p>{msg.message}</p></span>)}
                            {isEdit && (<input type="text" class="form-control" 
                            onChange={(handleChange)}
                            value={msgVal} 
                            />)}
                                
                                <div class="d-flex">
                                    <div className="mr-auto p-2">
                                        <span class="time_date">{formatDate(msg.sentOn)}</span>
                                    </div>
                                    {isShown && (<><div className="p-2" onClick={() => starMessage(msg, loginUser)}><span><i class="fa fa-star" aria-hidden="true"></i></span></div>
                                    {!isEdit && (
                                        <div className="p-2" onClick={() => setIsEdit(true)}>
                                            <span><i class="fa fa-pencil" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>)}
                                        {isEdit && (
                                        <div className="p-2" >
                                            <span onClick={() => updateCurrMessage(msg._id, msgVal)}><i class="fa fa-check edit-sp" aria-hidden="true"></i>  
                                            </span>
                                            <span onClick={() => setIsEdit(false)}><i class="fa fa-close" aria-hidden="true"></i>
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