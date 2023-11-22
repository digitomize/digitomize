# Backend Documentation

Welcome to the backend documentation for our open-source project. This document provides an overview of the backend structure, API routes, and how to contribute to the project.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Routes](#api-routes)
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

## Firebase Credentials

To get credentials you should first have a firebase project. If you don't know how to make one please check [Frontend Documentation](/client/README.md). 

* Select your project.
* Go to "Project Settings" by clicking on the gear icon next to "Project Overview" in the top-left corner.
* Navigate to the "Service accounts" tab.
* If you haven't created a service account yet, click on "Generate new private key."
* This will generate a new service account key and automatically download it as a JSON file (`serviceAccountKey.json`). it will look something like this

  ```json
  {
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYourPrivateKey\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account-email@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project-id.iam.gserviceaccount.com"
  }
  ```
* copy this entire thing and set it as the value of FIREBASE_CREDENTIALS in your .env file. (Make sure the entire json is placed on a single line)

### Running the Server

Start the server: `npm start`

## API Routes

- https://digitomize.stoplight.io/docs/digitomize-api
