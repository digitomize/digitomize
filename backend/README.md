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
  /contest
    /controllers   # Logic for handling API requests related to contests
    /models        # Database models for contests
    /routes        # API route definitions for contests
  /user
    /controllers   # Logic for handling API requests related to users
    /models        # Database models for users
    /routes        # API route definitions for users
    /middlewares   # Custom middleware functions specific to users
    /services      # Reusable services and utilities specific to users
  index.js         # Main server file
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
MONGODB_URL=mongodb://localhost:27017/digitomize
PORT=4001
BACKEND_URL=http://localhost:4001
CONTESTS=true
USERS=true
NODE_ENV=development

# Firebase Configuration
FIREBASE_CREDENTIALS= # you need to add JSON for this 
```

### Running the Server

Start the server: `npm start`

## API Routes

- https://digitomize.stoplight.io/docs/digitomize-api
