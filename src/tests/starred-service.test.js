import {createUser, deleteUsersByUsername} from "../services/users-service";
import {deleteMessage, sendMessage} from "../services/messages-service";
import {userStarsMessage, userUnstarsMessage} from "../services/starred-service";
import axios from "axios";

describe('user can star a message', () => {
    let newMessage=null;

    // sample user for creating tuit
    const testUser1 = {
        username: 'harrypotter',
        password: 'theboywholived',
        email: 'harry.potter@hogwarts.com'
    };

    const testUser2={
        username: 'ron',
        password: 'weasley',
        email: 'ron.weasley@hogwarts.com'
    }

    // sample message to create
    const testMessage = {
        message: 'Hey, this is Harry Potter!',
        from: testUser1,
        to: testUser2
    };

    const testStarredMessage ={
        message: testMessage,
        starredBy: testUser1
    }

    // setup test before running test
    beforeAll( () => {
          axios.defaults.adapter = require('axios/lib/adapters/http')
         deleteUsersByUsername(testUser1.username);
         deleteUsersByUsername(testUser2.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await userUnstarsMessage(testUser._id, testMessage._id);
        await deleteUsersByUsername(testUser.username);
        await deleteMessage(testMessage._id);
    })

    test('user can star a message', async () => {
        axios.defaults.adapter = require('axios/lib/adapters/http')
        // create new user with test user parameter
        const newUser1 = await createUser(testUser1);
        const newUser2 = await createUser(testUser2);
        // create new tuit using created user's identifier
        console.log("inside the test env");
        console.log(" the new user 1 is "+newUser1.username);
        newMessage = await sendMessage(newUser1._id, newUser2._id, testMessage.message);
        console.log(" user sends the message");
        const newStarredMessage= await userStarsMessage(newUser1._id, newMessage.message);

        // verify inserted tuit's properties match test tuit parameter
        expect(newStarredMessage.message).toEqual(testStarredMessage.message);
    });
});