import {deleteUsersByUsername} from "../services/users-service";
import {deleteMessage, sendMessage} from "../services/messages-service";
import {userStarsMessage, userUnstarsMessage} from "../services/starred-service";
import {login, signup} from "../services/auth-service";

describe('user can star a message', () => {
    let newStarredMessage = null;

    // sample user for sending message
    const testUser1 = {
        username: 'harrypotter',
        password: 'theboywholived',
        email: 'harry.potter@hogwarts.com'
    };

    const testUser2 = {
        username: 'ron',
        password: 'weasley',
        email: 'ron.weasley@hogwarts.com'
    };

    // sample message to create
    const testMessage = {
        message: 'Hey, this is Harry Potter!',
    };

    // setup test before running test
    beforeAll( async () => {
         await deleteUsersByUsername(testUser1.username);
         await deleteUsersByUsername(testUser2.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await userUnstarsMessage(newStarredMessage.starredBy, newStarredMessage.message);
        await deleteMessage(newStarredMessage.message);
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
    })

    test('user can star a message', async () => {
        // create new user with test user parameter
        const newUser1 = await signup(testUser1);
        const newUser2 = await signup(testUser2);
        // login with the sender user parameters
        await login(testUser1);
        const newMessage = await sendMessage(newUser1._id, newUser2._id, testMessage);
        newStarredMessage = await userStarsMessage(newUser1._id, newMessage._id);

        // verify inserted tuit's properties match test tuit parameter
        expect(newStarredMessage.message).toEqual(newMessage._id);
        expect(newStarredMessage.starredBy).toEqual(newUser1._id);
    });
});