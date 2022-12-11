import {deleteUsersByUsername} from "../services/users-service";
import {deleteMessage, findAllMessagesBetweenUsers, sendMessage, updateMessage} from "../services/messages-service";
import {login, signup} from "../services/auth-service";

describe('user sends message', () => {
    let newMessage = {};

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

    // sample message to be sent
    const testMessage = {
        message: 'Test message from Harry to Ron.'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteMessage(newMessage._id);
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    test('send message', async () => {
        // create users and store the results for identifier
        const newUser1 = await signup(testUser1);
        const newUser2 = await signup(testUser2);
        // login user sending the message for session
        await login(testUser1);
        newMessage = await sendMessage(newUser1._id, newUser2._id, testMessage);

        // verify send message response properties with user identifiers
        expect(newMessage.message).toEqual(testMessage.message);
        expect(newMessage.from).toEqual(newUser1._id);
        expect(newMessage.to).toEqual(newUser2._id);
    });
});


describe('user updates message', () => {
    let newMessage = {};

    // sample users for chat
    const testUser1 = {
        username: 'harrypotter',
        password: 'theboywholived',
        email: 'harry.potter@hogwarts.com'
    };
    const testUser2 = {
        username: 'hermione',
        password: 'wingardiumleviosa',
        email: 'hermione.granger@hogwarts.com'
    };

    // sample message to be sent
    const testMessage = {
        message: 'Test message from Harry to Hermione.'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteMessage(newMessage._id);
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    test('update message', async () => {
        // create users and store the results for identifier
        const newUser1 = await signup(testUser1);
        const newUser2 = await signup(testUser2);
        // login user sending the message for session
        await login(testUser1);
        newMessage = await sendMessage(newUser1._id, newUser2._id, testMessage);

        const modifiedMessage = {
            message: 'Modified at ' + Date.now()
        };
        const updatedMessage = await updateMessage(newUser1._id, newMessage._id, modifiedMessage);

        // verify send message response properties with user identifiers
        expect(updatedMessage.message).toEqual(modifiedMessage.message);
        expect(updatedMessage.from).toEqual(newUser1._id);
        expect(updatedMessage.to).toEqual(newUser2._id);
    });
});

describe('user deletes message', () => {
    // sample users for chat
    const testUser1 = {
        username: 'ronweasley',
        password: 'spiders',
        email: 'ron.weasley@hogwarts.com'
    };
    const testUser2 = {
        username: 'hermione',
        password: 'wingardiumleviosa',
        email: 'hermione.granger@hogwarts.com'
    };

    // sample message to be sent
    const testMessage = {
        message: 'Test message from Ron to Hermione.'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    test('delete message', async () => {
        // create users and store the results for identifier
        const newUser1 = await signup(testUser1);
        const newUser2 = await signup(testUser2);
        // login user sending the message for session
        await login(testUser1);
        const newMessage = await sendMessage(newUser1._id, newUser2._id, testMessage);
        let messages = await findAllMessagesBetweenUsers(newUser1._id, newUser2._id);
        expect(messages.length).toEqual(1);

        const status = await deleteMessage(newMessage._id);

        // verify send message response properties with user identifiers
        expect(status.deletedCount).toEqual(1);
        messages = await findAllMessagesBetweenUsers(newUser1._id, newUser2._id);
        expect(messages.length).toEqual(0);
    });
});