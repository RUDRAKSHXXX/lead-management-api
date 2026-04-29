# Lead Management API

## Overview

This project is a RESTful API for managing leads in a sales pipeline. It supports full CRUD operations and enforces strict status transition rules to ensure a valid lead lifecycle. The API is designed to be simple, scalable, and easy to extend.

---

## Tech Stack

### Node.js

Node.js was chosen for its asynchronous, non-blocking architecture, which allows handling multiple requests efficiently. It is well-suited for building scalable backend APIs.

### Express.js

Express.js provides a minimal and flexible framework for building REST APIs. It simplifies routing, middleware management, and overall application structure.

### MongoDB

MongoDB was selected as a NoSQL database for its flexibility in handling dynamic schemas. It is ideal for storing lead data and scales easily with growing datasets.

### Mongoose

Mongoose is used as an ODM to define schemas and interact with MongoDB. It provides built-in validation and simplifies database operations.

---

## Setup & Run Locally

### 1. Clone the repository

git clone https://github.com/RUDRAKSHXXX/lead-management-api.git
cd lead-management-api

### 2. Install dependencies

npm install

### 3. Setup environment variables

Create a `.env` file in the root directory and add:

PORT=3000
MONGO_URI=mongodb://rudraksh:rudra123@ac-kctphq0-shard-00-00.qr6vhgn.mongodb.net:27017,ac-kctphq0-shard-00-01.qr6vhgn.mongodb.net:27017,ac-kctphq0-shard-00-02.qr6vhgn.mongodb.net:27017/crm?ssl=true&replicaSet=atlas-nz5hmf-shard-0&authSource=admin&retryWrites=true&w=majority

### 4. Run the server

npm run dev

Server will run on:

http://localhost:3000

---

## API Documentation

### Base URL

http://localhost:3000/api/leads


## Endpoints

#### Create Lead

POST /api/leads

```json
{
  "name": "Rudraksh Mohan",
  "email": "rudraksh@example.com",
  "status": "NEW"
}
```

#### Get All Leads

GET /api/leads

#### Get Lead by ID

GET /api/leads/:id

#### Update Lead

PUT /api/leads/:id

#### Delete Lead

DELETE /api/leads/:id

#### Update Lead Status (with validation)

PUT /api/leads/:id/status

```json
{
  "status": "CONTACTED"
}
```

---

## Status Transition Rules

NEW → CONTACTED → QUALIFIED → CONVERTED
           ↘
            LOST

Invalid transitions are rejected with a 400 error.

---

## Design Decisions

* **Status Validation Logic**: Implemented a strict transition map to ensure leads follow a valid lifecycle.

* **Separation of Concerns**: Used controllers, routes, and models for clean architecture and maintainability.

* **Scalability Considerations**: At scale, status updates should use database-level atomic operations or transactions to prevent race conditions.

* **In Future Improvements**:

  * Add authentication & authorization
  * Implement pagination for large datasets
  * Add logging and monitoring
  * Use Docker for containerization

---

## Sample Data (Optional)

You can create sample leads using the POST endpoint or extend the project with a seed script.

---

## .gitignore

node_modules/
.env

---

## Author

Rudraksh Mohan
