# SMS Management Application API

## Dependencies

This is a node.js app that depends on the following technologies.

[**Express.js**](https://expressjs.com/): A Fast, opinionated, minimalist web framework for node which was used in routing this application.

[**BodyParser**](https://github.com/expressjs/body-parser): This module was used to collect search data sent from the client side to the routing page.

[**Sequelize**](https://www.sequelizejs.com): Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the app. It features solid transaction support, relations, read replication and more.

[**Postgresql**](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.

## Pre requisites & Installation

### Pre requisites

- Install (if not installed)
  - nodejs
  - postgresql
  - sequelize-cli (install this globally)

### Installation

1. Navigate to the directory you want it installed to. cd your folder
2. Clone the repository `https://github.com/HawiCaesar/sms-management-api.git`.
3. Create 2 databases(test and development) with PostgreSQL.
4. Open the sms-management-api folder.
5. Create a .env file using the .env.example as a guide.
6. `npm install` to install all dependencies.
7. `sequelize db:migrate` to run migrations.
8. `npm start` to start the app in development mode.
9. `npm test` runs all the tests.
10. The app runs on port 8000

### Features of the API

- A user can create contact
- A user can get all contacts
- A user can get a single contact
- A user can update a contact
- A user can delete a contact
- A user can create a message
- A user can get messages sent by a contact
- A user can get messages received by a contact
- A user can delete a message

### API Documentation

### POST a contact `/api/contacts`

#### Request

```
{
  "name": "James Dun",
  "phone": "254789123450",
}
```

#### Response

```
{
    "message": "contact created",
    "contact": {
        "id": 7,
        "name": "Marvin Yel",
        "phone": "254789123450",
        "updatedAt": "2019-03-26T19:26:12.707Z",
        "createdAt": "2019-03-26T19:26:12.707Z"
    }
}
```

### GET all contacts `/api/contacts`

#### Response

```
{
    "contacts": [
        {
            "id": 2,
            "name": "Orlod FRed",
            "phone": "254790123000",
            "createdAt": "2019-03-26T13:26:04.216Z",
            "updatedAt": "2019-03-26T13:26:04.216Z"
        },
        {
            "id": 3,
            "name": "Greg Frodo",
            "phone": "254769123350",
            "createdAt": "2019-03-26T13:29:49.699Z",
            "updatedAt": "2019-03-26T13:29:49.699Z"
        },
        {
            "id": 7,
            "name": "Marvin Yel",
            "phone": "254789123450",
            "createdAt": "2019-03-26T19:26:12.707Z",
            "updatedAt": "2019-03-26T19:26:12.707Z"
        }
    ]
}
```

### GET a single contact `/api/contacts/:contactId`

#### Response

```
{
    "message": "Contact retrived",
    "contact": {
        "id": 3,
        "name": "Greg Frodo",
        "phone": "1239009321",
        "createdAt": "2019-03-26T13:29:49.699Z",
        "updatedAt": "2019-03-26T13:29:49.699Z",
        "sentMessages": [
            {
                "id": 10,
                "senderId": 3,
                "receiverId": 2,
                "message": "Captain Marvel ?",
                "status": "sent",
                "createdAt": "2019-03-26T13:52:04.284Z",
                "updatedAt": "2019-03-26T13:52:04.284Z"
            },
            {
                "id": 11,
                "senderId": 3,
                "receiverId": 2,
                "message": "Vroom",
                "status": "sent",
                "createdAt": "2019-03-26T13:52:09.105Z",
                "updatedAt": "2019-03-26T13:52:09.105Z"
            },
            {
                "id": 12,
                "senderId": 3,
                "receiverId": 2,
                "message": "ChuChu",
                "status": "sent",
                "createdAt": "2019-03-26T13:52:23.615Z",
                "updatedAt": "2019-03-26T13:52:23.615Z"
            },
            {
                "id": 13,
                "senderId": 3,
                "receiverId": 2,
                "message": "Get a move on",
                "status": "sent",
                "createdAt": "2019-03-26T13:52:30.156Z",
                "updatedAt": "2019-03-26T13:52:30.156Z"
            }
        ],
        "receivedMessages": [
            {
                "id": 14,
                "senderId": 2,
                "receiverId": 3,
                "message": "I am gracious enough",
                "status": "sent",
                "createdAt": "2019-03-26T16:33:16.555Z",
                "updatedAt": "2019-03-26T16:33:16.555Z"
            }
        ]
    }
}
```

### PUT a contact (update) `/api/contacts/:contactId`

#### Request

```
{"name": "Marvin Yellow", phone: "254789123450"}
```

#### Response

```
{
    "message": "Contact updated",
    "contact": {
        "id": 7,
        "name": "Marvin Yellow",
        "phone": "254789123450",
        "createdAt": "2019-03-26T19:26:12.707Z",
        "updatedAt": "2019-03-26T19:48:49.437Z"
    }
}
```

### DELETE a contact `/api/contacts/:contactId`

#### Response

status code 204

### POST a message `/api/message`

#### Request

{ "sender": "254789123450", "receiver": "1239009321", "message": "goody"}

#### Response

```
{
    "response": {
        "id": 15,
        "senderId": 7,
        "receiverId": 3,
        "message": "goody",
        "status": "sent",
        "updatedAt": "2019-03-26T19:53:05.458Z",
        "createdAt": "2019-03-26T19:53:05.458Z"
    }
}
```

### DELETE a message `/api/message/:messageId`

#### Response

status code 204

### GET messages by sent by contact `/api/message/sent-messages/:phone`
in this case phone is `1239009321`
#### Response

```
{
    "contact": {
        "name": "Greg Frodo",
        "phone": "1239009321"
    },
    "sentMessages": [
        {
            "id": 10,
            "senderId": 3,
            "receiverId": 2,
            "message": "Captain Marvel ?",
            "status": "sent",
            "createdAt": "2019-03-26T13:52:04.284Z",
            "updatedAt": "2019-03-26T13:52:04.284Z"
        },
        {
            "id": 11,
            "senderId": 3,
            "receiverId": 2,
            "message": "Vroom",
            "status": "sent",
            "createdAt": "2019-03-26T13:52:09.105Z",
            "updatedAt": "2019-03-26T13:52:09.105Z"
        },
        {
            "id": 12,
            "senderId": 3,
            "receiverId": 2,
            "message": "ChuChu",
            "status": "sent",
            "createdAt": "2019-03-26T13:52:23.615Z",
            "updatedAt": "2019-03-26T13:52:23.615Z"
        },
        {
            "id": 13,
            "senderId": 3,
            "receiverId": 2,
            "message": "Goody",
            "status": "sent",
            "createdAt": "2019-03-26T13:52:30.156Z",
            "updatedAt": "2019-03-26T13:52:30.156Z"
        }
    ]
}
```

### GET messages by received by contact `/api/message/received-messages/:phone`
in this case phone is `1239009321`
#### Response

```
{
    "contact": {
        "name": "Greg Frodo",
        "phone": "1239009321"
    },
    "receivedMessages": [
        {
            "id": 14,
            "senderId": 2,
            "receiverId": 3,
            "message": "I am gracious enough",
            "status": "sent",
            "createdAt": "2019-03-26T16:33:16.555Z",
            "updatedAt": "2019-03-26T16:33:16.555Z"
        }
    ]
}
```
