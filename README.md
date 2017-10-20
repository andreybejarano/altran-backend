# Backend technical test Altran

> This project is Backend technical test for Altran Company

## Technologies
- Node.js v8.7.0
- EcmaScript 6, 7
- nvm

## Dependencies
- **Express** Framework web for Node.js
- **JsonWebToken** Gerator of JSON web Tokens for security
- **Morgan** Request logger
- **Request-promise** HTTP request client with promise support 

## Developer Dependencies
- **AVA** JavaScript testing framework  
- **Eslint** A linter tool for identifying and reporting on patterns in JavaScript
- **Eslint plugins for standard** Rules standard for **Eslint**

## Install
> This project requires **Node.js** v8.7.0 or later
1. Use node version for project in file .nvmrc
``` shell
$ nvm use
```
2. Install dependencies
``` shell
$ npm install
```

## Run
``` shell
$ npm start
```

## Run test
``` shell
$ npm test
```

## Endpoints
- Get user data filtered by user id: http://localhost:5000/users/{:id}
- Get user data filtered by user name: http://localhost:5000/users?name={:name}
- Get the list of policies linked to a user name: http://localhost:5000/policies?username={:username}
- Get the user linked to a policy number: http://localhost:5000/policies/{:idPolicy}/user

## Header \<authorization>
> For request endpoints i'm generate this json web tokens, this jwt send to request in a header **authorization**:
> ### User with rol user:
> - **name:** Merrill 
> - **email:** merrillblankenship@quotezart.com
> - **header authorization:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVycmlsbCIsImVtYWlsIjoibWVycmlsbGJsYW5rZW5zaGlwQHF1b3RlemFydC5jbyJ9.su5TSf0_sFPbeBMKk7ZADi5Ua03GcNegmp2WS5KO85M
> ### User with rol admin
> - **name:** Britney 
> - **email:** britneyblankenship@quotezart.com
> - **header authorization:** yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJpdG5leSIsImVtYWlsIjoiYnJpdG5leWJsYW5rZW5zaGlwQHF1b3RlemFydC5jb20ifQ.g_mK7NwvriN6MrDW00W1LONv5qY-iIMCm3j4KE6IlYA