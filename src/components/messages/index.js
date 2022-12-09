import React, {useEffect, useState} from "react";
import './messages.css';
import Message from "./message";
import NewMessage from "./new-message";
import StarredMessage from "./starred-messages";
import {useNavigate} from "react-router-dom";
import * as service from "../../services/messages-service";

const Messages = () => {
  const navigate = useNavigate();
  const [loggedInUserId, setLoggedInUserId] = useState('');

  const [messages, setMessages] = useState([]);

  
  const getLatestMessages = (uid) =>
      service.findLatestMessagesForUser(uid)
          .then(result => {
              for (let i = 0; i < result.length; i++) {
                  result[i].user = result[i].from._id === uid ? result[i].to : result[i].from;
              }
              result.sort((a, b) => new Date(b.sentOn) - new Date(a.sentOn));
              setMessages(result);
          });

  const getLoggedInUser = () => {
      const userId = sessionStorage.getItem('userId');
      if (userId && userId !== '') {
          setLoggedInUserId(userId);
          getLatestMessages(userId);
      } else {
          navigate('/login');
      }
  }

  useEffect(getLoggedInUser, [loggedInUserId]);

  return (
      <div className="ttr-messages">
          <div className="d-flex py-3 row">
            <div className=" cust-div1 float-left">
                <h1>Messages</h1>

            </div>
            <div className="cust-div2 float-left">
                {loggedInUserId && (<StarredMessage user={loggedInUserId}/>)}
            </div>
            <div className="cust-div3 float-left">
                {loggedInUserId && (<NewMessage currUser={loggedInUserId}/>)}
            </div>
              
          </div>
          <div className="list-group pe-4">
              {
                  messages && messages.map(message =>
                      <Message key={message.id} message={message}/>)
              }
          </div>
      </div>
  );
};

export default Messages;