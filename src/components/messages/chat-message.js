import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './chat.css';
import React from "react";
import * as service from "../../services/starred-service";
import * as messageService from "../../services/messages-service";

export const ChatMessage = ({message, loginUser, starred}) => {

    const [isStarred, setStarred] = useState(starred !== undefined && starred.some( m => m.message._id === message._id ))
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
        .then(m => setStarred(true))
    }

    const unStarMessage = (message, currUser) => {
        service.userUnstarsMessage(currUser, message._id)
        .then(m => setStarred(false))
    }
    const updateCurrMessage = (uid, mid, message) => {
        messageService.updateMessage(uid, mid, {message})
        .then((m) => {

                setIsEdit(false)
                // updating the message
                setMsg(m)
                //update the input text
                setMsgVal(message)

            
        })
    }

    const isLoggedInUser = loginUser == message.from._id;
      
    return (
        
        <>
            {!isLoggedInUser && 
                <div className="incoming_msg">
                            <div className="incoming_msg_img "> 
                                <img className="rounded-circle" src={`../images/${message.from.username}.jpg`} alt="sunil"/> 
                            </div>
                            <div className="received_msg">
                                <div className="received_withd_msg" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                                    <p>{msg.message}</p>
                                    
                                    <div className="d-flex">
                                        <div className="mr-auto p-2"><span className="time_date">{formatDate(msg.sentOn)}</span></div>
                                        {isShown && (
                                        <>
                                        {!isStarred && (<div className="p-2" onClick={() => starMessage(msg, loginUser)}><span><i className="fa-regular fa-star" aria-hidden="true"></i></span></div>)}
                                        {isStarred && (<div className="p-2" onClick={() => unStarMessage(msg, loginUser)}><span><i className="fa-solid fa-star" aria-hidden="true"></i></span></div>)}
                                        
                                        </>
                                        )}
                                    
                                    </div>
                                </div>
                            </div>
                </div>
            }
            {
             isLoggedInUser  && 
                <div className="outgoing_msg">
                            <div className="sent_msg" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                            {!isEdit && (<span className="time_date"><p>{msg.message}</p></span>)}
                            {isEdit && (<input type="text" className="form-control" 
                            onChange={(handleChange)}
                            value={msgVal} 
                            />)}
                                
                                <div className="d-flex">
                                    <div className="mr-auto p-2">
                                        {msg.edited && (<span className="edit-flag1">Edited</span>)}
                                        <span className="time_date">{formatDate(msg.sentOn)}</span>
                                    </div>
                                    {isShown && (
                                    <>
                                        {!isStarred && (<div className="p-2" onClick={() => starMessage(msg, loginUser)}><span><i className="fa-regular fa-star" aria-hidden="true"></i></span></div>)}
                                        {isStarred && (<div className="p-2" onClick={() => unStarMessage(msg, loginUser)}><span><i className="fa-solid fa-star" aria-hidden="true"></i></span></div>)}
                                        {!isEdit && (
                                        <div className="p-2" onClick={() => setIsEdit(true)}>
                                            <span><i className="fa fa-pencil" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>)}
                                        {isEdit && (
                                        <div className="p-2" >
                                            <span onClick={() => updateCurrMessage(loginUser, msg._id, msgVal)}><i className="fa fa-check edit-sp" aria-hidden="true"></i>  
                                            </span>
                                            <span onClick={() => setIsEdit(false)}><i className="fa fa-close" aria-hidden="true"></i>
                                            </span>
                                            
                                        </div>)}    
                                        
                                    </>
                                    )}
                                    
                                </div>
                            </div>
                </div>
            }
            
            
                    
        </>
        
    );
};