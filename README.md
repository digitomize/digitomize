# Digitomize

**Digitomize** is an open-source platform that combines two main sections: Contests and User Profiles. It allows users to explore upcoming coding contests and dynamically create developer portfolios.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Contests Section](#contests-section)
  - [User Profiles](#user-profiles)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**Digitomize** is designed to provide developers with a comprehensive platform for exploring coding contests and creating dynamic portfolios that showcase their coding skills and achievements.

## Features

- **Contests Section:** Explore upcoming coding contests from platforms like LeetCode, Codeforces, CodeChef, and more. Filter contests based on various criteria and view contest details such as remaining time, duration, and more.

- **User Profiles:** Create your developer portfolio by providing user handles for different coding platforms. The platform dynamically fetches and displays your updated ratings, achievements, and coding history.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB

### Installation

1. Clone the repository: `git clone https://github.com/pranshugupta54/digitomize.git`
2. Install backend dependencies: `cd backend && npm install`
3. Install client dependencies: `cd client && npm install`
4. Configure environment variables: Create a `.env` file in the `backend` and `client` directory and set up necessary variables (e.g., database connection, API keys).
5. Start the backend server: `npm run start` (in the `backend` directory)
6. Start the client: `npm start` (in the `client` directory)

## Usage

### Contests Section

- Visit the **Contests** page to explore upcoming coding contests.
- Apply filters to narrow down contests based on your preferences.
- Click on a contest to view detailed information, including start time, duration, and platform.

### User Profiles

- Create your developer portfolio by signing up and providing your user handles for different coding platforms.
- The platform dynamically fetches and displays your latest ratings, achievements, and contest history.
- Customize your portfolio to display the information you want to share with others.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).
