Task Management API
A simplified task management system built using Node.js, Express, PostgreSQL, and JWT-based authentication. This API allows users to manage tasks with role-based access control (RBAC), allowing admin users full access and user users limited access to their own tasks.

Table of Contents
Features
Tech Stack
Setup Instructions
Local Setup
Docker Setup
API Documentation
Authentication Endpoints
Task Management Endpoints
Testing
Swagger API Docs
Contributions
Features
User Authentication:

Sign up and login with email/password.
JWT-based token generation for authentication.
Passwords are hashed using bcrypt for security.
Role-Based Access Control (RBAC):

Admin: Full access to all tasks.
User: Access only to their own tasks.
Task Management:

Create, update, delete, and fetch tasks.
Tasks have fields like title, description, due date, and status.
Filter tasks by status and due date, and sort them by creation date or due date.
Security:

Password hashing and JWT-based authentication.
Secure routes with authentication middleware to validate tokens.
Dockerization:

Docker containers for both the application and PostgreSQL database.
Swagger Documentation:

API documentation automatically generated with Swagger.
Tech Stack
Node.js - JavaScript runtime for the server.
Express - Web framework for building the API.
PostgreSQL - Relational database to store user and task data.
Sequelize - ORM for interacting with PostgreSQL.
JWT - JSON Web Token for user authentication.
Bcryptjs - Library for hashing passwords.
Swagger - OpenAPI specification for documenting the API.
Docker - Containerization of the application and database.
TypeScript - For type safety and better maintainability.
Setup Instructions
Local Setup
1. Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/task-manager-api.git
cd task-manager-api
2. Install dependencies:
bash
Copy code
npm install
3. Configure environment variables
Create a .env file in the root of the project with the following variables:

env
Copy code
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
PORT=5000
Replace the placeholders with your actual values.
or connect with the Database connection string 
DB_CONNECTION_STRING = postgres//...

4. Run the application
To run the application in development mode, use the following command:

bash
Copy code
npm run dev
This will start the application on http://localhost:5000.

5. Database Setup
Make sure PostgreSQL is installed and running locally. Create a database named task_manager (or modify the .env to match your database name).

You can also run migrations or sequelize.sync() to create tables automatically based on models.

6. Access the API
The API will be accessible at http://localhost:5000. Use tools like Postman or cURL to test the endpoints.

Docker Setup
To run the application and PostgreSQL database with Docker, follow these steps:

1. Build and start the containers:
bash
Copy code
docker-compose up --build
2. Access the API
Once the containers are up and running, the application will be available at http://localhost:5000, and the PostgreSQL database will be accessible at localhost:5432.

You can access the API documentation at http://localhost:5000/api-docs.

API Documentation
This section provides an overview of the available API endpoints and their usage.

Authentication Endpoints
1. Sign Up
POST /api/auth/signup

Request body:

json
Copy code
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "user"  // Optional, default is "user"
}
Response:

json
Copy code
{
  "token": "your_jwt_token"
}
2. Login
POST /api/auth/login

Request body:

json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "token": "your_jwt_token"
}
Task Management Endpoints
1. Create Task
POST /api/tasks

Request body:

json
Copy code
{
  "title": "Task Title",
  "description": "Description of the task",
  "dueDate": "2024-12-31T23:59:59Z",
  "status": "pending"
}
Response:

json
Copy code
{
  "id": 1,
  "title": "Task Title",
  "description": "Description of the task",
  "dueDate": "2024-12-31T23:59:59Z",
  "status": "pending",
  "userId": 1
}
2. Get User's Tasks
GET /api/tasks/user
Response:
json
Copy code
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Description of the task",
    "dueDate": "2024-12-31T23:59:59Z",
    "status": "pending",
    "userId": 1
  }
]
3. Get All Tasks (Admin Only)
GET /api/tasks
Response:
json
Copy code
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Description of the task",
    "dueDate": "2024-12-31T23:59:59Z",
    "status": "pending",
    "userId": 1
  }
]
Testing
Unit and integration tests are written using Jest. To run the tests, use the following command:

bash
Copy code
npm run test
Make sure to configure your testing environment properly, especially the database connection.

Swagger API Docs
Swagger is used for generating API documentation. The documentation is automatically available at:

bash
Copy code
http://localhost:5000/api-docs
You can explore the API using the interactive Swagger UI.

Contributions
Contributions are welcome! Please fork this repository, create a new branch, and submit a pull request with your changes.

License
This project is licensed under the MIT License.