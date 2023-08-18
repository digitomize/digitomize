# Backend Documentation

Welcome to the backend documentation for our open-source project. This document provides an overview of the backend structure, API routes, and how to contribute to the project.

## Table of Contents
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Routes](#api-routes)
  - [Contest Routes](#contest-routes)
  - [User Routes](#user-routes)
- [Contributing](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [License](../LICENSE)

## Folder Structure

The backend folder is organized into several directories, each serving a specific purpose:
```bash
/backend
  /controllers   # Logic for handling API requests
    /contest
    /user
  /middlewares   # Custom middleware functions
  /models        # Database models
    /contest
    /user
  /routes        # API route definitions
    /contest
    /user
  /services      # Reusable services and utilities
  index.js      # Main server file
```

## Getting Started

### Installation

1. Clone the repository: `git clone https://github.com/pranshugupta54/digitomize.git`
2. Navigate to the backend directory: `cd digitomize/backend`
3. Install dependencies: `npm install`

### Environment Variables

Configure your environment variables in the `.env` file. This file should contain sensitive information and configurations that your application needs, such as database connection strings, API keys, and more.
#### Example:
```bash
TEST=Env file connected.
MONGODB_URL=mongodb://localhost:27017/example
PORT=4001
```

### Running the Server

Start the server: `npm start`

## API Routes

### Contest Routes

- `/api/contests` - Get a list of all upcoming contests.
- `/api/contests/:contestId` - Get detailed information about a specific contest.

### User Routes

- `/api/user/signup` - Sign up a new user.
- `/api/user/login` - Log in an existing user.
- `/api/user/dashboard` - Retrieve user data for the dashboard.
- `/api/user/profile/:username` - View the profile of a specific user.
- `/api/user/update` - Update user profile data.

For more detailed information on each route and its functionality, refer to the respective route files in the `/routes` directory.
