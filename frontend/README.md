# Online Event Management Platform - Frontend

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Styling](#styling)
- [API Services](#api-services)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This is the frontend of the **Online Event Management Platform** built with **React** and **TailwindCSS**. It allows users to browse events, purchase tickets, and manage registrations. Admin users can create, update, and delete events.

The application is fully responsive and optimized for modern browsers.

## Features
- User registration and login (JWT authentication).
- Event listing with detailed pages.
- Secure ticket booking and payment integration.
- Admin panel for event management (CRUD operations).
- Responsive design with TailwindCSS.

---

## Project Structure
```plaintext
src/
├── components/        # Reusable React components (e.g., Navbar, Footer, EventCard).
├── pages/             # Route-based pages (e.g., Home, EventDetail, AdminPanel).
├── services/          # API service files for HTTP requests.
├── utils/             # Utility functions (e.g., helpers, constants).
├── App.js             # Main app component.
├── index.js           # Entry point of the application.
├── assets/            # Static assets (e.g., images).
└── styles/            # Global and TailwindCSS-specific styles.
```

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/online-event-management-frontend.git
   cd online-event-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

---

## Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
```

Replace `<your-stripe-public-key>` with your actual Stripe public key.

---

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

---

## Styling
- **TailwindCSS** is used for styling.
- Global styles can be updated in the `tailwind.config.js` file.
- Component-specific styles are added via `className` attributes in JSX.

---

## API Services
API calls are handled in the `src/services/` directory. The main service files include:

- **`auth.js`**: Handles user registration, login, and profile-related API calls.
- **`api.js`**: Contains general API calls (e.g., fetching events).
- **`payment.js`**: Manages payment-related API calls.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

