import React from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/messages-service";

export const UserList = ({currUser,users}) => {
  const navigate = useNavigate()
  const goToMessages = (loggedInUser, otherUser, otherUsername) => {
        
    service.findAllMessagesBetweenUsers(loggedInUser, otherUser)
        .then((ms) => {
            navigate('/chat', {
                state: {
                  msg: ms,
                  user: loggedInUser,
                  otherUser: otherUser,
                  otherUsername: otherUsername
                }
              })
        })
        .catch(e => alert(e));
    
}
  return (
    <div className="list-group p-2">
      {
        users.map(user => {
          return (
            // need to add current logged in user
              <div key={user._id} onClick={() => 
                goToMessages(currUser, user._id, user.username)
              } className="list-group-item ttr-message d-flex">

                  <img src={`../images/${user.username}.jpg`}
                       className="ttr-user-avatar-logo rounded-circle"/>
                  <div className="mx-2">
                    <h5 className="m-1">{user.username}</h5>
                    <span>@{user.username}</span>
                  </div>
              </div>
          )
        })
      }
    </div>)
};
