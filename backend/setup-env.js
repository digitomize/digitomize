import inquirer from 'inquirer';
import fs from 'fs';

const questions = [
    {
        type: 'input',
        name: 'MONGODB_URL',
        message: 'Enter MongoDB URL:',
        default: 'mongodb://127.0.0.1:27017/digitomize',
        validate: function (value) {
            return value.trim() !== '' ? true : 'Please enter a value for MONGODB_URL.';
        }
    },
    {
        type: 'input',
        name: 'PORT',
        message: 'Enter PORT:',
        default: '4001',
        validate: function (value) {
            return value.trim() !== '' ? true : 'Please enter a value for PORT.';
        }
    },
    {
        type: 'input',
        name: 'BACKEND_URL',
        message: 'Enter BACKEND_URL:',
        default: 'http://localhost:4001',
        validate: function (value) {
            return value.trim() !== '' ? true : 'Please enter a value for BACKEND_URL.';
        }
    },
    {
        type: 'confirm',
        name: 'CONTESTS',
        message: 'Do you want CONTESTS to be enabled?',
        default: true
    },
    {
        type: 'confirm',
        name: 'USERS',
        message: 'Do you want USERS to be enabled?',
        default: true
    },
    {
        type: 'input',
        name: 'NODE_ENV',
        message: 'Enter NODE_ENV:',
        default: 'development',
        validate: function (value) {
            return value.trim() !== '' ? true : 'Please enter a value for NODE_ENV.';
        }
    },
    {
        type: 'confirm',
        name: 'HACKATHONS',
        message: 'Do you want HACKATHONS to be enabled?',
        default: true
    },
    {
        type: 'input',
        name: 'NOVU_API_KEY',
        message: 'Enter NOVU_API_KEY:',
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
