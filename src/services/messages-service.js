import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000";

// const MESSAGE_API = `${BASE_URL}/users`;

export const findAllMessagesSent = (uid) =>
    axios.get(`${BASE_URL}/users/${uid}/sent-messages`)
        .then(response => response.data);

export const findAllMessagesBetweenUsers = (uid, ruid) =>
    axios.get(`${BASE_URL}/users/${uid}/messages/${ruid}`)
        .then(response => response.data);

        // /users/:uid/messages/:ruid
export const sendMessage = (uid, ruid, msg) =>
        axios.post(`${BASE_URL}/users/${uid}/messages/${ruid}`, msg)
            .then(response => response.data);

const service = {
    findAllMessagesBetweenUsers,
    findAllMessagesSent,
    sendMessage
}

export default service;