import {deleteUsersByUsername} from "../services/users-service";
import {
    deleteMessage,
    findAllMessagesBetweenUsers,
    findLatestMessagesForUser,
    sendMessage
} from "../services/messages-service";
import {login, signup} from "../services/auth-service";

describe('find messages between users', () => {
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
    const testMessages = [
        {message: "Hey how is everything going for you?"},
        {message: "Been busy with studies lately! What about you?"}
    ];

    let chatMessages = [];

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        // remove any data we created
        for (const message of chatMessages) {
            await deleteMessage(message._id);
        }
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    });

    test('chat between 2 users', async () => {
        // create users and store the results for identifier
        const newUser1 = await signup(testUser1);
        const newUser2 = await signup(testUser2);

        // login user sending the message for session
        await login(testUser1);
        await sendMessage(newUser1._id, newUser2._id, testMessages[0]);
        // find first message and verify messages count is 1
        chatMessages = await findAllMessagesBetweenUsers(newUser1._id, newUser2._id);

        expect(chatMessages.length).toEqual(1);
        // login as second user
        await login(testUser2);
        await sendMessage(newUser2._id, newUser1._id, testMessages[1]);
        chatMessages = await findAllMessagesBetweenUsers(newUser1._id, newUser2._id);

        // find both messages and verify messages count is 2
        expect(chatMessages.length).toEqual(2);

        // verify test messages properties in order
        expect(chatMessages[0].message).toEqual(testMessages[0].message);
        expect(chatMessages[0].from._id).toEqual(newUser1._id);
        expect(chatMessages[0].to._id).toEqual(newUser2._id);
        expect(chatMessages[1].message).toEqual(testMessages[1].message);
        expect(chatMessages[1].from._id).toEqual(newUser2._id);
        expect(chatMessages[1].to._id).toEqual(newUser1._id);
    });
});

describe('find latest messages for user', () => {
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
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        await deleteUsersByUsername(testUser3.username);
    });

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        for (const message of testMessages) {
            await deleteMessage(message._id);
        }
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        await deleteUsersByUsername(testUser3.username);
    });

    test('latest messages in all conversations for user', async () => {
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

        const result = await findLatestMessagesForUser(newUser1._id);

        // find all latest messages and verify count is exactly 2 for 2 conversations
        expect(result.length).toEqual(2);

        // Message 1 is an older message so should not be present
        const actualMsg1 = result.filter(m => m._id === msg1._id);
        expect(actualMsg1.length).toEqual(0);
        // Message 2 should be present because it's latest in chat between user 1 & 3
        const actualMsg2 = result.filter(m => m._id === msg2._id);
        expect(actualMsg2.length).toEqual(1);
        // Message 3 should be present because it's latest in chat between user 1 & 2
        const actualMsg3 = result.filter(m => m._id === msg3._id);
        expect(actualMsg3.length).toEqual(1);
    });
});