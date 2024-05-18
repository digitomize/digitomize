import inquirer from "inquirer";
import fs from "fs";

const questions = [
    {
        type: 'input',
        name: 'MONGODB_URL',
        message: 'Enter MongoDB URL:',
        default: 'mongodb://localhost:27017/digitomize',
        validate: function (value) {
            if (value.trim()) {
                return true;
            }
            return 'Please enter a value for MongoDB URL.';
        }
    },
    {
        type: 'input',
        name: 'PORT',
        message: 'Enter the port:',
        default: '4001',
        validate: function (value) {
            if (value.trim()) {
                return true;
            }
            return 'Please enter a value for the port.';
        }
    },
    {
        type: 'input',
        name: 'BACKEND_URL',
        message: 'Enter backend URL:',
        default: 'http://localhost:4001',
        validate: function (value) {
            if (value.trim()) {
                return true;
            }
            return 'Please enter a value for backend URL.';
        }
    },
    {
        type: 'confirm',
        name: 'CONTESTS',
        message: 'Enable contests?',
        default: false
    },
    {
        type: 'confirm',
        name: 'USERS',
        message: 'Enable users?',
        default: true
    },
    {
        type: 'list',
        name: 'NODE_ENV',
        message: 'Select the environment:',
        choices: ['development', 'production'],
        default: 'development'
    },
    {
        type: 'confirm',
        name: 'COMMUNITY',
        message: 'Enable community?',
        default: true
    },
    {
        type: 'input',
        name: 'FIREBASE_CREDENTIALS',
        message: 'Enter Firebase credentials as a single object:',
        default: '{}',
        validate: function (value) {
            try {
                JSON.parse(value);
                return true;
            } catch (e) {
                return 'Please enter a valid JSON object.';
            }
        }
    }
];

async function setup() {
    try {
        const answers = await inquirer.prompt(questions);
        const envContent = `TEST=Env file connected\n` +
            Object.entries(answers)
                .map(([key, value]) => `${key}=${typeof value === 'boolean' ? value : value}`)
                .join('\n');
        fs.writeFileSync('.env', envContent);
        console.log('Environment variables have been set successfully.');
    } catch (error) {
        console.error('Error occurred during setup:', error);
    }
}

setup();
