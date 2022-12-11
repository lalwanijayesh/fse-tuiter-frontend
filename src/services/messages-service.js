import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const findLatestMessagesForUser = (uid) =>
    axios.get(`${BASE_URL}/users/${uid}/chats`)
        .then(response => response.data);

export const findAllMessagesSent = (uid) =>
    axios.get(`${BASE_URL}/users/${uid}/sent-messages`)
        .then(response => response.data);

export const findAllMessagesBetweenUsers = (uid, ruid) =>
    axios.get(`${BASE_URL}/users/${uid}/messages/${ruid}`)
        .then(response => response.data);

export const sendMessage = (uid, ruid, msg) =>
    axios.post(`${BASE_URL}/users/${uid}/messages/${ruid}`, msg)
        .then(response => response.data);

export const updateMessage = (uid, mid, msg) =>
    axios.put(`${BASE_URL}/users/${uid}/messages/${mid}`, msg)
        .then(response => response.data);

export const deleteMessage = (mid) =>
    axios.delete(`${BASE_URL}/messages/${mid}`)
        .then(response => response.data);

const service = {
    findLatestMessagesForUser,
    findAllMessagesBetweenUsers,
    findAllMessagesSent,
    sendMessage,
    updateMessage,
    deleteMessage
}

export default service;