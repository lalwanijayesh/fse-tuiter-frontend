import React from "react";
import {Link} from "react-router-dom";

export const UserList = ({users}) => {
  return (
    <div className="list-group p-2">
      {
        users.map(user => {
          return (
              <Link key={user._id} to={`/home/${user._id}`}
                    className="list-group-item ttr-message d-flex">
                  <img src={`../images/${user.username}.jpg`}
                       className="ttr-user-avatar-logo rounded-circle"/>
                  <div className="mx-2">
                    <h5 className="m-1">{user.username}</h5>
                    <span>@{user.username}</span>
                  </div>
              </Link>
          )
        })
      }
    </div>)
};
