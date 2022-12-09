import React from 'react';
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/messages-service";
import * as starredService from "../../services/starred-service";

const Message = ({message}) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
      const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const goToMessages = (otherUser, otherUsername) => {
        const loggedInUser = sessionStorage.getItem('userId');
        starredService.findAllStarredMessagesByUser(loggedInUser)
            .then(stMs => {
              service.findAllMessagesBetweenUsers(loggedInUser, otherUser)
              .then((ms) => {
                  navigate('/chat', {
                      state: {
                        msg: ms,
                        user: loggedInUser,
                        otherUser: otherUser,
                        otherUsername: otherUsername,
                        stMs: stMs
                      }
                    })
              })
              .catch(e => alert(e));
            });
        
    } 
    return (
        // give loggedin userid or other userid to goToMessages function
        <div className="list-group-item ttr-message d-flex" onClick={() => goToMessages(message.user._id, message.user.username)}>
          
          <img src={`../images/${message.user.username}.jpg`}
               className="ttr-user-avatar-logo rounded-circle"/>
          <div className="mx-2">
              <h5>{message.user.username}@{message.user.username}</h5>
              <span>{message.message}</span>
          </div>
          <span className="ms-auto">{formatDate(message.sentOn)}</span>

        </div>
    );
};

export default Message;