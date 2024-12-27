import inquirer from "inquirer";
import fs from "fs";

const questions = [
  {
    type: "input",
    name: "VITE_REACT_APP_BACKEND_URL",
    message: "Enter backend URL:",
    default: "http://localhost:4001",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for backend URL.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_FRONTEND_URL",
    message: "Enter frontend URL:",
    default: "http://localhost:5173",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for frontend URL.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_API_KEY",
    message: "Enter Firebase API key:",
    default: "AIzaSyALK7O1zL_8kftC-fG8Ke0_KF1VEb--dTw",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase API key.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_AUTH_DOMAIN",
    message: "Enter Firebase authentication domain:",
    default: "digitomize-testers.firebaseapp.com",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase authentication domain.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_PROJECT_ID",
    message: "Enter Firebase project ID:",
    default: "digitomize-testers",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase project ID.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_STORAGE_BUCKET",
    message: "Enter Firebase storage bucket:",
    default: "digitomize-testers.appspot.com",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase storage bucket.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_MESSAGING_SENDER_ID",
    message: "Enter Firebase messaging sender ID:",
    default: "1032745553541",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase messaging sender ID.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_APP_ID",
    message: "Enter Firebase app ID:",
    default: "1:1032745553541:web:8a4647c8754edb051123ec",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase app ID.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_MEASUREMENT_ID",
    message: "Enter Firebase measurement ID:",
    default: "G-XVFS5HD03Z",
    validate: function (value) {
      if (value.trim()) {
        return true;
      }
      return "Please enter a value for Firebase measurement ID.";
    },
  },
  {
    type: "input",
    name: "VITE_REACT_APP_FORMBRICKS_API_KEY",
    message: "Enter Formbricks api key:",
  },
  {
    type: "input",
    name: "VITE_REACT_APP_VAPID_KEY",
    message: "Enter VapID Key:",
  },
];

async function setup() {
  try {
    const answers = await inquirer.prompt(questions);
    const envContent = Object.entries(answers)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");
    fs.writeFileSync(".env", envContent);
    console.log("Environment variables have been set successfully.");
  } catch (error) {
    console.error("Error occurred during setup:", error);
  }
}

setup();
