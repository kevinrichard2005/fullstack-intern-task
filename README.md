# fullstack-intern-task

A full-stack web application for discovering and favoriting premium templates. Built with React (Vite), Tailwind CSS v4, Node.js, Express, and SQLite.

## Tech Stack

### Frontend
- **React.js** with **Vite** for fast development and building.
- **Tailwind CSS v4** for modern, utility-first styling and glassmorphism effects.
- **React Router v6** for client-side routing and protected routes.
- **Axios** for API requests with JWT interception.
- **Heroicons** for SVG icons.
- **react-hot-toast** for notifications.

### Backend
- **Node.js** & **Express.js** for the REST API.
- **SQLite3** for lightweight data storage.
- **Knex.js** for query building and database migrations/seeds.
- **JWT (JSON Web Tokens)** & **bcrypt** for secure authentication.

## Project Structure

- `/client` - React frontend
- `/server` - Express backend

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Backend Setup
Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Set up Environment Variables:
Copy `.env.example` to `.env` and adjust the values if needed.
```bash
cp .env.example .env
```

Run database migrations and seed sample templates:
```bash
npm run migrate
npm run seed
```

Start the backend server (runs on `http://localhost:5000`):
```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal and navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the Vite development server (runs on `http://localhost:5173`):
```bash
npm run dev
```

## Features
- **User Authentication**: Register, Login, and Logout functionality.
- **Template Browsing**: View all available templates in a responsive grid.
- **Search & Filter**: Find templates by name, description, or category.
- **Favorites System**: Authenticated users can save and view their favorite templates.
- **Protected Routes**: `/favorites` page requires a valid JWT.

## Contact
- Name: [Your Name]
- Email: [your.email@example.com]
