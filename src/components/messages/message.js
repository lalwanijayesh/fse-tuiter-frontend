import React from 'react';

const Message = ({message}) => {
    return (
        <div className="list-group-item ttr-message d-flex">
          <img src={`../images/${message.user}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
          <div className="mx-2">
              <h5>{message.user}@{message.user}</h5>
              <span>{message.message}</span>
          </div>
          <span className="ms-auto">{message.date}</span>
        </div>
    );
};

export default Message;