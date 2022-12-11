import {deleteUsersByUsername, findAllUsers} from "../services/users-service";
import {deleteMessage, findAllMessagesBetweenUsers, sendMessage} from "../services/messages-service";
import {login, logout, signup} from "../services/auth-service";
import {render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter, HashRouter, MemoryRouter, Router} from "react-router-dom";
import Messages from "../components/messages";
import {ChatScreen} from "../components/messages/chatscreen";

// sample users for chat
const testUser1 = {
    username: 'tonystark',
    password: 'stark3000',
    email: 'tony@stark.com'
};
const testUser2 = {
    username: 'brucewayne',
    password: 'iambatman',
    email: 'bruce@wayne.com'
};
let newUser1, newUser2, testMessages = [];

// setup test before running test
beforeAll(async () => {
    // create users and store the results for identifier
    newUser1 = await signup(testUser1);
    newUser2 = await signup(testUser2);

    // login as user 2 and send message to user 1
    await login(testUser2);
    const msg1 = await sendMessage(newUser2._id, newUser1._id,
        {message: "Message from user 2 to user 1"});
    testMessages.push(msg1);

    // login as user 1 and send message to user 2
    await login(testUser1);
    const msg2 = await sendMessage(newUser1._id, newUser2._id,
        {message: "Message from user 1 to user 2"});
    testMessages.push(msg2);
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
});

test('chat between 2 users renders', async () => {
    // retrieve all users using api
    const loggedInUser = await login(testUser1);
    sessionStorage.setItem('userId', loggedInUser._id);
    const chatMessages = await findAllMessagesBetweenUsers(loggedInUser._id, newUser2._id);
    // create routing history with state properties including chat messages
    const initialEntries = ['/', {pathname: '/', search: '', hash: 'test', state: {msg: chatMessages}}];
    render(
        <MemoryRouter initialEntries={initialEntries}>
            <ChatScreen/>
        </MemoryRouter>
    )
    // find element with specific text from test user
    await waitFor(() => {
        // Verify Message 1 & 3 is in the document, not Message 2
        const msg1 = screen.getByText(/Message from user 2 to user 1/i);
        expect(msg1).toBeInTheDocument();
        const msg3 = screen.getByText(/Message from user 1 to user 2/i);
        expect(msg3).toBeInTheDocument();
    });
});