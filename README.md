# Simple CRUD API

Assignment: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md

## How to download and install application:

### 1. Clone repository:
```
git clone ${link to repository}
```
### 2. Change repository branch:
```
git checkout crud-api
```
### 3. Install dependencies:
```
npm install
```

## How to run application:
Run in a development mode:
```
npm run start:dev
```
Run in a production mode:
```
npm run start:prod
```
Run test scenarios:
```
npm run test
```

## API implementation:
Implemented endpoint: `api/users`

`GET api/users` - get all users
`GET api/users/${userId}` - get one user by id
`POST api/users is used` - create record about new user and store it in database
`PUT api/users/{userId}` - to update existing user
`DELETE api/users/{userId}` - to delete existing user from database

## User fields:
`username` — user's name (string, **required**)
`age` — user's age (number, **required**)
`hobbies` — user's hobbies (array of strings or empty array, **required**)