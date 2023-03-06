# Videos Creator Platform - Full Stack Developer Assessment - Frontend

In this platform video creators can upload (video URL) new videos, sign up, and list the available videos and video creators. They will also have the ability to like videos and follow other video creators.

## How to set up the app locally

1.  Install the required dependencies

```
npm install
```

2.  Create a .env file in the root directory with the server URL

```
REACT_APP_SERVER_URL=http://localhost:8000
```

3. To start the app run:

```
npm run start
```

This will start the client on http://localhost:3000

## Considerations and Notes

### Deployment

The app is currently deployed online to use, the client can be found at:

```
https://videoapp-frontend.vercel.app/
```

The deployment is already connected to the deployed server, so testing can be made easily.
If you have any errors when setting up the local environment, feel free to test the client in the deployed URL.

### Users to test

To test the app you can use the following users, which are already loaded in the cloud database

```
user1@example.com - password1$
user2@example.com - password2$
```

### Functionalities

- Sign in & Sign out (JWT)
- List videos
- Video details
- Profile details (incomplete)
- Responsiveness app-wide

As i gave more importance to the Backend implementation, the following frontend functionalities are not implemented yet:

- Like/Unlike Video
- Publish/Unpublish Video
- Create Video
- Edit Video
- Follow/Unfollow Creator
- See followers in profile page
- See unpublished videos in profile page (only if you are that user)
- Protected Routes
- CSS to make app look better

### Testing (not implemented yet)

## Tech Stack

- React.js
- Typescript
- Material UI
