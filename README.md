# Tuiter App

This is a Tuiter website allowing users to tuit ideas, media etc n make it viewable by other users on the platform. We have worked towards creating a messaging part of the tuiter app.

This is a project worked towards completion of the Graduate Course - CS5500 - Foundations Of Software Engineering under Prof. Jose Annunziato.

## Team - 13 members: 
- Chayank Thoralakki
- Shriya Hukkeri
- Jayesh Rajkumar Lalwani
- Ishita Taneja

## Feature - Messaging with other users and starring them.
- User can see conversation history containing list of conversations with other users
- User can lookup other users to start new chat
- User can chat with other users by typing in text and hitting send
- User can edit existing sent messages and see an indicator of 'Edited'
- User can star messages with in the chat screen
- User can lookup starred messages and remove them from list
- Incorporated login, signup and session mangement in the tuiter app

## add .env file to the project
please a .env file in the project directory.
It should contain the following:
This will allow ui-services to be connected the backend url we specify.

```
REACT_APP_BASE_URL=http://localhost:4000
```


## how to start application
Open command line in the project directory
Install node packages, you can run

```sh
npm install
```

deploy application locally, you can run:

```sh
npm start
```


To run all test cases, Launches the test runner in the interactive watch mode, you can run:

```sh
npm test
```

## Link to Backend github repository:

[Backend-Node-App](https://github.com/lalwanijayesh/fse-tuiter-backend)


## Link to Jira board:

the front-end tickets are tagged with epic name Front-end
[Team-13 Jira board](https://jannunzi.atlassian.net/jira/software/projects/T13F2/boards/16)


## Link to our scrum updates:

[Scrum Updates - Google Doc](https://docs.google.com/document/d/1v1xbOnTjrsUAjzy4qVZTLnjUvIZeNf3zzNz0l-9rjmU/edit?usp=sharing)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
