import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000";

// const MESSAGE_API = `${BASE_URL}/users`;
///users/:uid/stars/:mid
export const findAllStarredMessagesByUser = (uid) =>
    axios.get(`${BASE_URL}/starred/${uid}`)
        .then(response => response.data);

export const userStarsMessage = (uid, mid) =>
        axios.post(`${BASE_URL}/users/${uid}/stars/${mid}`)
            .then(response => response.data);

export const userUnstarsMessage = (uid, mid) =>
        axios.delete(`${BASE_URL}/users/${uid}/stars/${mid}`)
            .then(response => response.data);

const service = {
    findAllStarredMessagesByUser,
    userStarsMessage,
    userUnstarsMessage,
}

export default service;