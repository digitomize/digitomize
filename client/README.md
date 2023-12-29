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
- __client__
   - [README.md](README.md)
   - [api.js](api.js)
   - [firebase.js](firebase.js)
   - [index.html](index.html)
   - [manifest.json](manifest.json)
   - [netlify.toml](netlify.toml)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - [postcss.config.js](postcss.config.js)
   - __src__
     - [AdminPanelGuard.jsx](src/AdminPanelGuard.jsx)
     - [App.css](src/App.css)
     - [App.jsx](src/App.jsx)
     - [ProtectedRoute.jsx](src/ProtectedRoute.jsx)
     - __assets__   # Static assets like images and fonts
       - [atcoder.svg](src/assets/atcoder.svg)
       - [authentication\-animate.svg](src/assets/authentication-animate.svg)
       - [boyV7.png](src/assets/boyV7.png)
       - [codechef.svg](src/assets/codechef.svg)
       - [codeforces.svg](src/assets/codeforces.svg)
       - [codingninjas.png](src/assets/codingninjas.png)
       - [digitomizeLogo.png](src/assets/digitomizeLogo.png)
       - [fingerprint\-animate\-blue.svg](src/assets/fingerprint-animate-blue.svg)
       - [fingerprint\-animate.svg](src/assets/fingerprint-animate.svg)
       - __fonts__
         - [Geist\-Black.otf](src/assets/fonts/Geist-Black.otf)
         - [Geist\-Bold.otf](src/assets/fonts/Geist-Bold.otf)
         - [Geist\-Light.otf](src/assets/fonts/Geist-Light.otf)
         - [Geist\-Medium.otf](src/assets/fonts/Geist-Medium.otf)
         - [Geist\-Regular.otf](src/assets/fonts/Geist-Regular.otf)
         - [Geist\-SemiBold.otf](src/assets/fonts/Geist-SemiBold.otf)
       - [geeksforgeeks.svg](src/assets/geeksforgeeks.svg)
       - [github\-2.svg](src/assets/github-2.svg)
       - [github.svg](src/assets/github.svg)
       - [google.svg](src/assets/google.svg)
       - [hacker.png](src/assets/hacker.png)
       - [instagram.svg](src/assets/instagram.svg)
       - [leetcode.svg](src/assets/leetcode.svg)
       - [linkedin.svg](src/assets/linkedin.svg)
       - [logo.png](src/assets/logo.png)
       - [logo\_black\_cropped.webp](src/assets/logo_black_cropped.webp)
       - [meltcd.png](src/assets/meltcd.png)
       - [ms\_startups.png](src/assets/ms_startups.png)
       - [ms\_startups\_dark.png](src/assets/ms_startups_dark.png)
       - [myFont.ttf](src/assets/myFont.ttf)
       - [profilelogo.png](src/assets/profilelogo.png)
       - [quine.png](src/assets/quine.png)
       - [tublian.svg](src/assets/tublian.svg)
       - [twitter.svg](src/assets/twitter.svg)
     - __components__  # Reusable React components
       - [About.jsx](src/components/About.jsx)
       - [AllAssets.jsx](src/components/AllAssets.jsx)
       - __AuthButtons__
         - [GithubAuthButton.jsx](src/components/AuthButtons/GithubAuthButton.jsx)
         - [GoogleAuthButton.jsx](src/components/AuthButtons/GoogleAuthButton.jsx)
       - [ContestCards.jsx](src/components/ContestCards.jsx)
       - __Contests__
         - __Challenges__
           - [Button.jsx](src/components/Contests/Challenges/Button.jsx)
           - [Card.jsx](src/components/Contests/Challenges/Card.jsx)
           - [Challenges.jsx](src/components/Contests/Challenges/Challenges.jsx)
           - [ChallengesFilter.jsx](src/components/Contests/Challenges/ChallengesFilter.jsx)
           - [query.json](src/components/Contests/Challenges/query.json)
         - [ComingSoonLoader.jsx](src/components/Contests/ComingSoonLoader.jsx)
         - [ContestPage.jsx](src/components/Contests/ContestPage.jsx)
         - [ContestPageLayout.jsx](src/components/Contests/ContestPageLayout.jsx)
         - [Filter.jsx](src/components/Contests/Filter.jsx)
       - [Contests.jsx](src/components/Contests.jsx)
       - [Contributors.jsx](src/components/Contributors.jsx)
       - [CopyToClipboard.jsx](src/components/CopyToClipboard.jsx)
       - [CustomComponents.jsx](src/components/CustomComponents.jsx)
       - [CustomSlider.jsx](src/components/CustomSlider.jsx)
       - [Feedback.jsx](src/components/Feedback.jsx)
       - __Home__
         - [SectionOne.jsx](src/components/Home/SectionOne.jsx)
         - [SectionThree.jsx](src/components/Home/SectionThree.jsx)
         - [SectionTwo.jsx](src/components/Home/SectionTwo.jsx)
         - __svgs__
           - [GitBook.svg](src/components/Home/svgs/GitBook.svg)
           - [GitBookLight.svg](src/components/Home/svgs/GitBookLight.svg)
           - [MSME.svg](src/components/Home/svgs/MSME.svg)
           - [digitalOcean.svg](src/components/Home/svgs/digitalOcean.svg)
           - [microsoft.svg](src/components/Home/svgs/microsoft.svg)
           - [microsoft4strp.svg](src/components/Home/svgs/microsoft4strp.svg)
           - [santaHat.svg](src/components/Home/svgs/santaHat.svg)
       - [Home.jsx](src/components/Home.jsx)
       - [ImageUploader.jsx](src/components/ImageUploader.jsx)
       - [IndividualCard.jsx](src/components/IndividualCard.jsx)
       - [Layout.jsx](src/components/Layout.jsx)
       - [Login.jsx](src/components/Login.jsx)
       - [MobNav.jsx](src/components/MobNav.jsx)
       - [MuiIcons.jsx](src/components/MuiIcons.jsx)
       - [NewLogin.jsx](src/components/NewLogin.jsx)
       - [NewNavbar.jsx](src/components/NewNavbar.jsx)
       - [Updates.jsx](src/components/Updates.jsx)
       - __css__
         - [Card.css](src/components/css/Card.css)
         - [Contests.css](src/components/css/Contests.css)
         - [CopyToClipboard.css](src/components/css/CopyToClipboard.css)
         - [Filter.css](src/components/css/Filter.css)
         - [Home.css](src/components/css/Home.css)
         - [IndividualCard.css](src/components/css/IndividualCard.css)
         - [InstallPWAButton.css](src/components/css/InstallPWAButton.css)
         - [Navbar.css](src/components/css/Navbar.css)
         - [ellipse.css](src/components/css/ellipse.css)
         - [error\-page.css](src/components/css/error-page.css)
         - [globals.css](src/components/css/globals.css)
         - [socials.css](src/components/css/socials.css)
       - __globals__
         - [BgEllipse.jsx](src/components/globals/BgEllipse.jsx)
         - [Button.jsx](src/components/globals/Button.jsx)
         - [Card.jsx](src/components/globals/Card.jsx)
         - [Filter.jsx](src/components/globals/Filter.jsx)
         - [Footer.jsx](src/components/globals/Footer.jsx)
         - [IndividualCard.jsx](src/components/globals/IndividualCard.jsx)
         - [InstallPWAButton.jsx](src/components/globals/InstallPWAButton.jsx)
         - [LoadingScreen.jsx](src/components/globals/LoadingScreen.jsx)
         - [Logout.jsx](src/components/globals/Logout.jsx)
         - [MetaData.jsx](src/components/globals/MetaData.jsx)
         - [MobNav.jsx](src/components/globals/MobNav.jsx)
         - [Navbar.jsx](src/components/globals/Navbar.jsx)
         - [NewNavbar.jsx](src/components/globals/NewNavbar.jsx)
         - [ScrollToTop.jsx](src/components/globals/ScrollToTop.jsx)
         - [Signup.jsx](src/components/globals/Signup.jsx)
         - [error\-page.jsx](src/components/globals/error-page.jsx)
       - [share\_model.jsx](src/components/share_model.jsx)
     - __context__  # State management contexts
       - [UserAuthContext.jsx](src/context/UserAuthContext.jsx)
       - [UserContext.jsx](src/context/UserContext.jsx)
     - __core__ # API services, app modal & utilities
       - __api__
         - [community.api.js](src/core/api/community.api.js)
         - [user.api.js](src/core/api/user.api.js)
       - __components__
         - __AppModal__
           - [AppDialog.Styled.jsx](src/core/components/AppModal/AppDialog.Styled.jsx)
           - [AppDialog.jsx](src/core/components/AppModal/AppDialog.jsx)
           - [index.js](src/core/components/AppModal/index.js)
       - __utils__
         - [const.js](src/core/utils/const.js)
         - [options.js](src/core/utils/options.js)
     - __dsaSheets__  # Components and services for dsa content
       - __components__
         - [QuestionComponent.jsx](src/dsaSheets/components/QuestionComponent.jsx)
         - [SheetCard.jsx](src/dsaSheets/components/SheetCard.jsx)
       - __layout__
         - [SheetLayout.jsx](src/dsaSheets/layout/SheetLayout.jsx)
       - __pages__
         - [SheetDetail.jsx](src/dsaSheets/pages/SheetDetail.jsx)
         - [SheetHome.jsx](src/dsaSheets/pages/SheetHome.jsx)
     - [index.css](src/index.css)
     - [index.styled.jsx](src/index.styled.jsx)
     - __lib__  # Additional libraries or utility functions
       - [utils.ts](src/lib/utils.ts)
     - [main.jsx](src/main.jsx)
     - [metaData.json](src/metaData.json)
     - __pages__ # Components for different pages
       - __admin__
         - __CommunityListPage__
           - [CommunityListPage.jsx](src/pages/admin/CommunityListPage/CommunityListPage.jsx)
           - __CreateCommunity__
             - [CreateCommunity.helper.js](src/pages/admin/CommunityListPage/CreateCommunity/CreateCommunity.helper.js)
             - [CreateCommunity.jsx](src/pages/admin/CommunityListPage/CreateCommunity/CreateCommunity.jsx)
             - [index.js](src/pages/admin/CommunityListPage/CreateCommunity/index.js)
           - [index.js](src/pages/admin/CommunityListPage/index.js)
         - __ContestListPage__
           - [ContestListPage.jsx](src/pages/admin/ContestListPage/ContestListPage.jsx)
           - [index.js](src/pages/admin/ContestListPage/index.js)
         - __UserListPage__
           - __CreateUser__
             - [CreateUser.helper.js](src/pages/admin/UserListPage/CreateUser/CreateUser.helper.js)
             - [CreateUser.jsx](src/pages/admin/UserListPage/CreateUser/CreateUser.jsx)
             - [index.js](src/pages/admin/UserListPage/CreateUser/index.js)
           - __DeleteUser__
             - [DeleteUser.helper.js](src/pages/admin/UserListPage/DeleteUser/DeleteUser.helper.js)
             - [DeleteUser.jsx](src/pages/admin/UserListPage/DeleteUser/DeleteUser.jsx)
             - [index.js](src/pages/admin/UserListPage/DeleteUser/index.js)
           - [UserListPage.jsx](src/pages/admin/UserListPage/UserListPage.jsx)
           - [index.js](src/pages/admin/UserListPage/index.js)
       - __home__
         - [Homepage.jsx](src/pages/home/Homepage.jsx)
     - [service\-worker.js](src/service-worker.js)
     - [serviceWorkerRegistration.js](src/serviceWorkerRegistration.js)
     - __user__ # User-specific components, services or data
       - __Profile__
         - [NewUserProfile.jsx](src/user/Profile/NewUserProfile.jsx)
         - __components__
           - [AllAssets.jsx](src/user/Profile/components/AllAssets.jsx)
           - [CustomLinkCard.jsx](src/user/Profile/components/CustomLinkCard.jsx)
           - [MuiIcons.jsx](src/user/Profile/components/MuiIcons.jsx)
           - [PlatformRatings.jsx](src/user/Profile/components/PlatformRatings.jsx)
           - [UserCard.jsx](src/user/Profile/components/UserCard.jsx)
         - __pages__
           - [ProfileLayout.jsx](src/user/Profile/pages/ProfileLayout.jsx)
           - [ProfileRatingsPage.jsx](src/user/Profile/pages/ProfileRatingsPage.jsx)
       - [UserHeader.jsx](src/user/UserHeader.jsx)
       - [UserLayout.jsx](src/user/UserLayout.jsx)
       - __components__
         - [Checkbox.jsx](src/user/components/Checkbox.jsx)
         - [DashboardNavbar.jsx](src/user/components/DashboardNavbar.jsx)
         - [MobileNav.jsx](src/user/components/MobileNav.jsx)
         - [NewLogOut.jsx](src/user/components/NewLogOut.jsx)
         - [SignoutButton.jsx](src/user/components/SignoutButton.jsx)
         - [Toggle.jsx](src/user/components/Toggle.jsx)
         - [UserTabs.jsx](src/user/components/UserTabs.jsx)
       - __dashboard__
         - [UserDashAccount.jsx](src/user/dashboard/UserDashAccount.jsx)
         - [UserDashGithub.jsx](src/user/dashboard/UserDashGithub.jsx)
         - [UserDashPersonal.jsx](src/user/dashboard/UserDashPersonal.jsx)
         - [UserDashRatings.jsx](src/user/dashboard/UserDashRatings.jsx)
         - [UserDashboard.jsx](src/user/dashboard/UserDashboard.jsx)
       - __leaderboard__
         - [Leaderboard.jsx](src/user/leaderboard/Leaderboard.jsx)
         - __components__
           - [Rank.jsx](src/user/leaderboard/components/Rank.jsx)
   - [tailwind.config.js](tailwind.config.js)
   - [utils.js](utils.js)
   - [vercel.json](vercel.json)
   - [vite.config.js](vite.config.js)
   - [vite.config.js.timestamp\-1696584442930\-043e5b095871b.mjs](vite.config.js.timestamp-1696584442930-043e5b095871b.mjs)
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
