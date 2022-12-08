import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {UserList} from "../profile/user-list";
import * as service from "../../services/users-service";
import * as starredService from "../../services/starred-service";
import './messages.css'
import { MessageList } from './message-list';

function StarredMessage({user}) {
    const loggedinUser = user
    const [show, setShow] = useState(false);
    const [msgs, setMsgs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findAllStarredMessagesByUser = () =>
    starredService.findAllStarredMessagesByUser(loggedinUser)
            .then(ms => {
                setMsgs(ms)
            });

    useEffect(findAllStarredMessagesByUser, []);

    return (
        <div className='float-right'>
            <i className="far fa-2x fa-star m-3 px-5" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Starred Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MessageList messages={msgs}/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StarredMessage;