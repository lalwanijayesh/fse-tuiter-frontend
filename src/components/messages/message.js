import React from 'react';
import {HashRouter, Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import * as service from "../../services/messages-service";

const Message = ({message}) => {
    const navigate = useNavigate()
    const msgs = []
    // const msgs = [
    //     {
    //         "_id": "63537d95ccd1567d446c3395",
    //         "from": "63411e798f69a59f7b473251",
    //         "to": "63411e6f8f69a59f7b47324f",
    //         "message": "Hello World",
    //         "sentOn": "2022-10-22T05:20:21.908Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63537e65c00c537d9e263ab9",
    //         "to": "63411e798f69a59f7b473251",
    //         "from": "63411e6f8f69a59f7b47324f",
    //         "message": "Hey",
    //         "sentOn": "2022-10-22T05:23:49.332Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "63537eb1c00c537d9e263abc",
    //         "to": "63411e798f69a59f7b473251",
    //         "from": "63411e6f8f69a59f7b47324f",
    //         "message": "sup",
    //         "sentOn": "2022-10-22T05:25:05.138Z",
    //         "__v": 0
    //     }
    // ];
    const goToMessages = (loggedInUser, otherUser) => {
        
        service.findAllMessagesBetweenUsers(loggedInUser, otherUser)
            .then((ms) => {
                navigate('/chat', {
                    state: {
                      msg: ms,
                      user: loggedInUser,
                      otherUser: otherUser
                    }
                  })
            })
            .catch(e => alert(e));
        
    } 
    return (
        // give loggedin userid or other userid to goToMessages function
        <div className="list-group-item ttr-message d-flex" onClick={() => goToMessages('63411e798f69a59f7b473251', '63411e6f8f69a59f7b47324f')}>
          
          <img src={`../images/${message.user}.jpg`}
               className="ttr-user-avatar-logo rounded-circle"/>
          <div className="mx-2">
              <h5>{message.user}@{message.user}</h5>
              <span>{message.message}</span>
          </div>
          <span className="ms-auto">{message.date}</span>

        </div>
    );
};

export default Message;