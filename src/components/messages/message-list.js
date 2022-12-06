import React from "react";
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/messages-service";
import './chat.css';

export const MessageList = ({messages}) => {

  const formatDate = (dateString) => {
    const options = {month: "long", day: "numeric", hour: 'numeric', minute: 'numeric', hour12: true}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div className="list-group p-2">
      {
        messages && messages.map(msg => {
          return (
            // need to add current logged in user
              <div key={msg._id} className="list-group-item ">

                  {/* <img src={`../images/${user.username}.jpg`}
                       className="ttr-user-avatar-logo rounded-circle"/> */}
                  <div className="mx-2 msgs-list">
                    <h4 className="m-1">{msg.message}</h4>
                    <div className="delete-msg"><i class="fa fa-close"></i></div>
                    <span><small>@{msg.from}</small></span>
                    <span className="time_date">{formatDate(msg.sentOn)}</span>
                  </div>
              </div>
          )
        })
      }
    </div>)
};
