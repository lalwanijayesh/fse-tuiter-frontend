import React from "react";
import './messages.css';
import Message from "./message";
import NewMessage from "./new-message";
import { ChatScreen } from "./chatscreen";
import StarredMessage from "./starred-messages";

const Messages = () => {
  // TODO - replace dummy data with API response
  const messages = [
      {id: 1, user: 'alice', 'message': 'Hello, how\'s it going?', date: 'November 22'},
      {id: 2, user: 'bob', 'message': 'This is the best tv show ever.', date: 'November 10'},
      {id: 3, user: 'charlie', 'message': 'I will see you tonight then!', date: 'August 6'},
      {id: 4, user: 'dan', 'message': 'What do you think?', date: 'January 19'},
  ];
  return (
      <div className="ttr-messages">
          <div className="d-flex py-3 row">
            <div className=" cust-div1 float-left">
                <h1>Messages</h1>

            </div>
            <div className="cust-div2 float-left">
            <StarredMessage/>
            </div>
            <div className="cust-div3 float-left">
            <NewMessage/>
            </div>
              
          </div>
          <div className="list-group pe-4">
              {
                  messages && messages.map(message =>
                      <Message key={message.id} message={message}/>)
              }
          </div>
          {/* <div>
            <ChatScreen/>
          </div> */}
      </div>
  );
};

export default Messages;