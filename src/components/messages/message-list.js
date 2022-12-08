import React, { useState } from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/starred-service";
import './chat.css';

export const MessageList = ({messages}) => {

  const [mesages, setMessages] = useState(messages)
  const formatDate = (dateString) => {
    const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const unstarMessage = (message, currUser) => {
    service.userUnstarsMessage(currUser, message)
    .then(status => {
      console.log(status)
      service.findAllStarredMessagesByUser(currUser)
    .then(msgs => setMessages(msgs))
    })

    
  }
  return (
    <div className="list-group p-2">
      {
        mesages && mesages.map(msg => {
          return (
            // need to add current logged in user
              <div key={msg._id} className="list-group-item ">

                  {/* <img src={`../images/chaplin.jpg`}
                       className="ttr-user-avatar-logo rounded-circle"/> */}
                  <div className="mx-2 msgs-list">
                    <h4 className="m-1">{msg.message.message}</h4>
                    <div className="delete-msg" onClick={() => unstarMessage(msg.message._id, msg.starredBy)}><i class="fa fa-close"></i></div>
                    <span><small>@{msg.message.from.username}</small></span>
                    <span className="time_date">{formatDate(msg.message.sentOn)}</span>
                  </div>
              </div>
          )
        })
      }
    </div>)
};
