# Backend Documentation for Event Management Application

## Overview
This backend is built using **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs to handle various operations for the Event Management Application, including user authentication, event management, ticketing, and payments.

---

## Features
- **Authentication**: User registration, login, and JWT-based authentication.
- **Role-Based Access**: Admin and user roles with protected routes.
- **Event Management**: CRUD operations for events (admin only).
- **Ticketing**: Purchase tickets for events.
- **Payment Integration**: Integration with payment gateways like Stripe.

---

## Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- npm (comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=<frontend-url>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

### 4. Start the Server
#### Development Mode:
```bash
npm run dev
```
#### Production Mode:
```bash
npm start
```

---

## Folder Structure
```plaintext
backend/
├── controllers/       # Request handlers for routes
├── middleware/        # Authentication and error handling middleware
├── models/            # MongoDB schemas
├── routes/            # API route definitions
├── utils/             # Helper functions (e.g., token generation)
├── .env               # Environment variables
├── server.js          # Main entry point
└── package.json       # Dependencies and scripts
```

---

## API Endpoints

### User Routes
| Method | Endpoint              | Description                   | Access      |
|--------|-----------------------|-------------------------------|-------------|
| POST   | `/api/users/register` | Register a new user           | Public      |
| POST   | `/api/users/login`    | Login a user and get a token  | Public      |
| GET    | `/api/users/profile`  | Get user profile              | Protected   |
| PUT    | `/api/users/profile`  | Update user profile           | Protected   |

### Event Routes
| Method | Endpoint              | Description                   | Access      |
|--------|-----------------------|-------------------------------|-------------|
| POST   | `/api/events`         | Create a new event            | Admin       |
| GET    | `/api/events`         | Get all events                | Public      |
| GET    | `/api/events/:id`     | Get a specific event          | Public      |
| PUT    | `/api/events/:id`     | Update an event               | Admin       |
| DELETE | `/api/events/:id`     | Delete an event               | Admin       |

### Ticket Routes
| Method | Endpoint              | Description                   | Access      |
|--------|-----------------------|-------------------------------|-------------|
| POST   | `/api/tickets`        | Purchase a ticket             | Protected   |
| GET    | `/api/tickets`        | Get user tickets              | Protected   |

### Payment Routes
| Method | Endpoint              | Description                   | Access      |
|--------|-----------------------|-------------------------------|-------------|
| POST   | `/api/payments`       | Process a payment             | Protected   |

---

## Middleware

### Authentication Middleware
- **protect**: Ensures the route is accessible only to authenticated users.
- **admin**: Grants access to admin users only.

### Error Handling Middleware
Centralized error handling for API requests.

---

## Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
}
```

### Event Model
```javascript
{
  title: String,
  description: String,
  date: Date,
  location: String,
  price: Number,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}
```

### Ticket Model
```javascript
{
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  isPaid: Boolean,
}
```

---

## Testing with Postman

1. **Register a User**
   - Method: `POST`
   - URL: `http://localhost:5000/api/users/register`
   - Body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "123456"
     }
     ```
   - Expected Response:
     ```json
     {
       "_id": "user-id",
       "name": "John Doe",
       "email": "john@example.com",
       "isAdmin": false,
       "token": "jwt-token"
     }
     ```

2. **Login User**
   - Method: `POST`
   - URL: `http://localhost:5000/api/users/login`
   - Body:
     ```json
     {
       "email": "john@example.com",
       "password": "123456"
     }
     ```

3. **Create Event (Admin Only)**
   - Method: `POST`
   - URL: `http://localhost:5000/api/events`
   - Headers:
     ```
     Authorization: Bearer <admin-token>
     ```
   - Body:
     ```json
     {
       "title": "Tech Conference",
       "description": "Latest trends in tech",
       "date": "2024-12-31",
       "location": "New York",
       "price": 99.99
     }
     ```

4. **Get All Events**
   - Method: `GET`
   - URL: `http://localhost:5000/api/events`

5. **Update an Event (Admin Only)**
   - Method: `PUT`
   - URL: `http://localhost:5000/api/events/<event-id>`
   - Headers:
     ```
     Authorization: Bearer <admin-token>
     ```
   - Body:
     ```json
     {
       "title": "Updated Tech Conference 2024"
     }
     ```
   - Expected Response:
     ```json
     {
       "_id": "event-id",
       "title": "Updated Tech Conference 2024",
       "description": "Latest trends in tech",
       "date": "2024-12-31",
       "location": "New York",
       "price": 99.99,
       "organizer": "organizer-id"
     }
     ```

6. **Delete an Event (Admin Only)**
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/events/<event-id>`
   - Headers:
     ```
     Authorization: Bearer <admin-token>
     ```
   - Expected Response:
     ```json
     {
       "message": "Event removed"
     }
     ```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

