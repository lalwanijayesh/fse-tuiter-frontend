import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {UserList} from "../profile/user-list";
import * as service from "../../services/users-service";
import './messages.css'

function NewMessage({currUser}) {
    const logInUser = currUser
    const [show, setShow] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findAllUsers = () =>
        service.findAllUsers()
            .then(users => {
                const userExcludinMe = users.filter(user =>
                    user._id !== currUser)
                setUsers(userExcludinMe);
                setFilteredUsers(userExcludinMe);
            });

    const filterBySearch = (event) => {
        const keyword = event.target.value.trim();
        setFilteredUsers(users.filter(user =>
            user.username.toLowerCase().startsWith(keyword.toLowerCase()))
        );
    }

    useEffect(findAllUsers, []);
    return (
        <div>
            <i className="far fa-2x fa-message-plus m-3 px-2" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group p-2">
                        <span className="input-group-text">
                            <i className="far fa-search"></i>
                        </span>
                        <input type="text" className="form-control" placeholder="Search here"
                               onChange={filterBySearch}/>
                    </div>
                    <UserList currUser={logInUser} users={filteredUsers}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default NewMessage;