# Meet-Cookies: A Personal meeting scheduling platform

## Tools and technologies used

- ReactJS
- NodeJS
- Express
- MongoDb
- PassportJS
- Google Cloud API

## How to setup

#### Pre-requisites

- NodeJS
- Google cloud account with
  - Google Calendar API enabled
  - Oauth2 credentials with
    1. Authorized JavaScript origins
       ```url
       http://localhost:5173
       http://localhost:8000
       ```
    2. Authorized redirect URIs
       ```url
       http://localhost:5173
       http://localhost:8000/auth/google/callback
       ```
       From here you'll get your Google Client secret and client Id
  - Google OAuth consent screen with following scopes 1. .../auth/userinfo.email 2. .../auth/userinfo.profile 3. .../auth/calendar.events
  - MongoDB database

##### NOTE: IF you're using a unverified Google Credentials for app you'll also need to add list of emails you'll be using to test the application inside Oauth consert screen in Google cloud console under Test users section

#### Steps

1. Clone the repository using following command

```bash
git clone <link>
```

2.  The base folder contains NodeJS application and front end folder contains ReactJS applicaiton
3.  Install node_modules for NodeJS project, write the following in terminal

```bash
npm install
```

2. Install node_modules for ReactJS applicaiton, go to front end folder in terminal

```bash
cd frontend
npm install
```

3. Create a .env file in base folder for NodeJS applicaion and it should contain the following keys

```
PORT= // Post number for Node server
COOKIE_KEY= // To Store cookie values
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_AUTH_REDIRECT=
GOOGLE_OAUTH_URL=
GOOGLE_API_BASE_URL=
MICROSOFT_API_BASE_URL=
MONGO_URI= // MongoDB Connection string
```

4. Run the NodeJS application

```bash
npm run start
```

5. Run React application in a different terminal inside react folder

```bash
cd frontend
npm run dev
```
