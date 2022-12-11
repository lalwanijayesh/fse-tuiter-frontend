import {deleteUsersByUsername, findAllUsers} from "../services/users-service";
import {deleteMessage, sendMessage} from "../services/messages-service";
import {login, logout, signup} from "../services/auth-service";
import {render, screen, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import Messages from "../components/messages";

// sample users for chat
const testUser1 = {
    username: 'harrypotter',
    password: 'theboywholived',
    email: 'harry.potter@hogwarts.com'
};
const testUser2 = {
    username: 'ronweasley',
    password: 'spiders',
    email: 'ron.weasley@hogwarts.com'
};
const testUser3 = {
    username: 'hermione',
    password: 'wingardiumleviosa',
    email: 'hermione.granger@hogwarts.com'
};
let testMessages = [];

// setup test before running test
beforeAll(async () => {
    // create users and store the results for identifier
    const newUser1 = await signup(testUser1);
    const newUser2 = await signup(testUser2);
    const newUser3 = await signup(testUser3);

    // login as user 2 and send message to user 1
    await login(testUser2);
    const msg1 = await sendMessage(newUser2._id, newUser1._id,
        {message: "Message from user 2 to user 1"});
    testMessages.push(msg1);

    // login as user 3 and send message to user 1
    await login(testUser3);
    const msg2 = await sendMessage(newUser3._id, newUser1._id,
        {message: "Message from user 3 to user 1"});
    testMessages.push(msg2);

    // login as user 1 and reply to user 2 only
    await login(testUser1);
    const msg3 = await sendMessage(newUser1._id, newUser2._id,
        {message: "Message from user 1 to user 2"});
    testMessages.push(msg3);
});

// clean up after test runs
afterAll(async () => {
    // remove any data we created
    await logout();
    for (const message of testMessages) {
        await deleteMessage(message._id);
    }
    await deleteUsersByUsername(testUser1.username);
    await deleteUsersByUsername(testUser2.username);
    await deleteUsersByUsername(testUser3.username);
});

test('latest messages list renders', async () => {
    // retrieve all users using api
    const loggedInUser = await login(testUser1);
    sessionStorage.setItem('userId', loggedInUser._id);
    render(
        <HashRouter>
            <Messages/>
        </HashRouter>
    )
    // find element with specific text from test user
    await waitFor(() => {
        // Verify Message 1 & 3 is in the document, not Message 2
        const msg1 = screen.getByText(/Message from user 3 to user 1/i);
        expect(msg1).toBeInTheDocument();
        const msg2 = screen.queryByText(/Message from user 2 to user 1/i);
        expect(msg2).toBeNull();
        const msg3 = screen.getByText(/Message from user 1 to user 2/i);
        expect(msg3).toBeInTheDocument();
    });
});