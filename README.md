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

Run the application in a development mode:
```
npm run start:dev
```
Run the application in a production mode:
```
npm run start:prod
```
Run the application in a cluster mode:
```
npm run start:multi
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

## Important notes:
> When you start cluster mode, please, wait until all workers start, they will print messages to console
```
Worker ${worker pid} is running on port ${worker port}  
```

> Also in cluster mode you can see, how load-balancer works:
```
Request was sent from load-balancer to worker ${worker pid}, port: ${worker port} 
```
