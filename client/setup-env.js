import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
  {
    type: 'input',
    name: 'VITE_REACT_APP_BACKEND_URL',
    message: 'Enter backend URL:',
    default: 'http://localhost:4001'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_FRONTEND_URL',
    message: 'Enter frontend URL:',
    default: 'http://localhost:5173'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_API_KEY',
    message: 'Enter API key:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_AUTH_DOMAIN',
    message: 'Enter authentication domain:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_PROJECT_ID',
    message: 'Enter project ID:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_STORAGE_BUCKET',
    message: 'Enter storage bucket:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_MESSAGING_SENDER_ID',
    message: 'Enter messaging sender ID:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_APP_ID',
    message: 'Enter app ID:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_MEASUREMENT_ID',
    message: 'Enter measurement ID:'
  },
  {
    type: 'input',
    name: 'VITE_REACT_APP_FORMBRICKS_API_KEY',
    message: 'Enter Formbricks api key: '
  }
];

async function setup() {
  try {
    const answers = await inquirer.prompt(questions);
    const envContent = Object.entries(answers)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    fs.writeFileSync('.env', envContent);
    console.log('Environment variables have been set successfully.');
  } catch (error) {
    console.error('Error occurred during setup:', error);
  }
}

setup();
