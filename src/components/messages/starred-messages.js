import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {UserList} from "../profile/user-list";
import * as service from "../../services/users-service";
import * as messageService from "../../services/messages-service";
import './messages.css'
import { MessageList } from './message-list';

function StarredMessage() {
    const [show, setShow] = useState(false);
    const [msgs, setMsgs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const findAllStarredMessagesByUser = () =>
    // need to add starred  message service code
        messageService.findAllMessagesSent('63411e6f8f69a59f7b47324f')
            .then(ms => {
                setMsgs(ms)
                // alert(JSON.stringify(ms))
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