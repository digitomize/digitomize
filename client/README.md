# Digitomize - Client

Welcome to the client-side documentation for Digitomize, an open-source platform that combines two main sections: Contests and User Profiles. This documentation covers the structure of the client-side codebase and provides information on how to get started.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Creating a .env from the .example.env file template](#creating-a-env-from-the-exampleenv-file-template)
    - [Creating New firebase project and setting up .env variables](#creating-new-firebase-project-and-setting-up-env-variables)
- [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Project Structure

The client directory is organized into several main directories and components:

```bash
/client
  /src
    /assets         # Static assets like images and fonts
    /components     # Reusable React components
      /AuthButtons
      /Contests
        /Challenges
      /Home
      /css
      /globals
    /context        # State management contexts
    /core           # API services, app modal & utilities
      /api
      /components
        /AppModal
      /utils
    /dsaSheets      # Components and services for dsa content
      /components
      /layout
      /pages
    /lib            # Additional libraries or utility functions
    /pages          # Components for different pages
      /admin
        /CommunityListPage
        /ContestListPage
        /UserListPage
      /home
    /user           # User-specific components, services or data
      /Profile
        /components
        /pages
      /components
      /dashboard
      /leaderboard
```

assets: This directory contains static assets such as images, fonts, and other files used in your application's user interface.

components: Reusable React components are stored here. These components can be used throughout your application to maintain consistency and modularity.

context: This directory contains context providers and related utility functions for state management.

core: Houses core functionalities or services used throughout your application like API services, modals or other essential utilities.

dsaSheets: Contains components, implementations, or utilities related to DSA content.

lib: This directory stores additional libraries or utility functions that are used across your application.

pages: Organized React components that represent different pages or views in your application.

user: Contains components and functionality related to user profiles.

## Getting Started

# Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js and npm

# Installation

- Clone the repository:

```bash
git clone https://github.com/digitomize/digitomize.git
```

- Navigate to the client directory:

```bash
cd digitomize/client
```

- Install dependencies:

```bash
npm install
```

# Configuration

Create a .env file in the client directory to configure any environment-specific variables or settings that your client application may require. For example, you may need to specify API endpoints or other configuration options.

```bash
VITE_REACT_APP_BACKEND_URL=http://localhost:4001
VITE_REACT_APP_FRONTEND_URL=http://localhost:5173
VITE_REACT_APP_API_KEY=
VITE_REACT_APP_AUTH_DOMAIN=
VITE_REACT_APP_PROJECT_ID=
VITE_REACT_APP_STORAGE_BUCKET=
VITE_REACT_APP_MESSAGING_SENDER_ID=
VITE_REACT_APP_APP_ID=
VITE_REACT_APP_MEASUREMENT_ID=
```

_Fill the empty fields by creating a demo firebase project._

## Creating a .env from the .example.env file template

- Create a new .env file in the client directory
- Copy the .example.env in the the client directory and paste it's contents into your created .env file
- Fill in the empty fields with the values from your firebase project (see below for instructions on how to create a firebase project)

#### Creating New firebase project and setting up .env variables

- Go to [Firebase](https://firebase.google.com/)
- Create an account if you don't have one and click on get started
- Add a project
- Add an app and select web as the platform
- Once you register your app you'll get a prompt to add firebase SDK to your app
- In that propt you'll see a const variable called firebaseConfig which will contain all your config info it will look something like this. (these are just dummy values)

  ```javascript
  const firebaseConfig = {
    apiKey: "IKNdsaKsdabdGL5iuywrfHUIKBubkjbJGDfIBHUGnkjVA",
    authDomain: "sample-u78nb.firebaseapp.com",
    projectId: "sample-u78nb",
    storageBucket: "sample-u78nb.appspot.com",
    messagingSenderId: "872459742932",
    appId: "9:872459742932:web:&8ufnhjbhbj89nu8b",
    measurementId: "G-YTUTY89kFT",
  };
  ```

- Use these values to populate your .env file

# Usage

The client-side codebase is responsible for rendering the user interface and interacting with the backend API. To run the client application, use the following command:

```bash
npm run dev
```

This command will start the development server. You can then access and interact with the Digitomize client application.

## Contributing

Contributions to the Digitomize project are welcome! If you would like to contribute to the client-side codebase, please refer to the [CONTRIBUTING.md](../CONTRIBUTING.md) file for details on how to contribute.

### Linting
- Run `npm run lint` to check for errors using the linter.
- Run `npm run lint-fix` to have the linter automatically fix errors where possible.

## License

This project is licensed under the [MIT License](../LICENSE).
