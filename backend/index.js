import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dataSyncer from './contest/controllers/DataSyncController.js';
import contestSyncer from './contest/controllers/contestController.js';
import contestRoutes from './contest/routes/contestRoutes.js';
import communityRoutes from './community/routes/communityRoutes.js';
import userRoutes from './users/routes/userRoutes.js';
import adminRoutes from './users/routes/adminRoutes.js';
import sheetRoutes from './DSA_sheets/routes/sheetRoutes.js';
import questionRoutes from './DSA_sheets/routes/questionRoutes.js';
import bodyParser from 'body-parser';
import fetchContestsData from './fetchContests.js';
import admin from 'firebase-admin';
import { routeLogging } from './users/middlewares/authMiddleware.js';

dotenv.config();
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(routeLogging);
}

// Handling uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

console.log(process.env.TEST);
async function main () {
  try {
    console.log('Pinging...');
    const contestsData = await fetchContestsData();
    console.log('Pong!');
  } catch (error) {
    console.error('Error pinging the server:', error);
  }
}

async function setupUserServer () {
  // console.log(process.env.FIREBASE_CREDENTIALS);
  console.log('ok');
  // Get the Firebase service account JSON from the environment variable
  const firebaseCredentials = {
    "type": "service_account",
    "project_id": "digitomize-34727",
    "private_key_id": "fef27af3e03e01cfe87a2c66eeff3fb850b561e4",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcgak/Juqb7UBF\nSpt+tXMcchdGvrDOcej559IGAE9Zio2aCBYKRwwwPYNEu5RqQ016/SUGwVzDvJW+\nCab5yDOJeB0kPaTD1NuVxarTQOwcBPm1TApToQjqrNk+Dc+DuV3bTZgKU5mct2xB\ngrpOk5ZwdJONX8fAq4vDBF1kczObKWwId3EyI+q5FuamqaJyO3UpjZeoqbDmAmcC\nmk0OdhnFpdAf0KJiWfV12zd8j19CKWP8hX944UNDoHHokX3yBvWcd/gxFmJyld4o\n3UfES5msy8YPq3KpHtOhE9nokxnveQQOdJrcYiIqzrOVbklXbBdS3ZxU9p6sVaNM\nlA6l8cY/AgMBAAECggEACDSUFweHTV2G/RsIRABnZJpmtgLRakF2oYOR81aY0mz9\nN5Is9aT78puHAleDVH7q1QPoqQ4COxDsGOaQpo/kg9SUUo4Y0Vubl6Khbin9Nwrb\nvLGb6P6MZSFi0moO8y0IyrKqwf/YEetb9aNQ+UWroYG7KrJW2rcjwLm928JedkgE\nqd6CKlgtgI7zznRLb2k4BLthvaIk1eIKraJnp7cKhykqCYAj8/ZNhoP8/91JJMTW\nkjO0VlbeKA7L8hqJB4CUWlEGp7kMCs2BVHnpNp3iQ8IH4BVWK0UTyQJGzfdtgzHX\nxUDn3nQaApvqQGAwHLTmoiN8qevfccJuatKqfa36QQKBgQDSnjiIPFpQnF4ViobG\nrVK/IvAW9wClLMlUKvafVNUN63IvgjmoWzg6MpB37zU+dkhyGhtcandFDDDaFqJt\nu/lhG7cRIHaTq4D9U/hgY6w34mekuAJDBbP3ls+jEmrPPPZVptmatUgWEf78/wEE\nrs6rmE0ZqY9TJ/4vdo1zSCr/xwKBgQC+Op/DpNlolfuL3T8HmaWy5nlCCLDojhfz\nkwOLl8B4Kv0AFO8VI98peDoYX5WoPivMG3cPiF0kJS+ErfyJ8y0uXS+xqdRG5Cwd\nLqevAxx8MS+0tI2ZsEnZgCEPxxcLnpdSYjDSTiUKG1miAKN4vuQZ2DVnviOK37G9\nWpB+Im91yQKBgHde5XuReT6m4UwkLy77nSJnktvxMpRrRdBGaXD0i6xP/W+fxz38\nNWoGrorLMMouD/FbipZeYSrpNeblXToEh9rZ8m/qjkozse/iX6uB0mH6F/Prtpx1\n5wI0n4o1LgQ28QaqgjqE9E5N9M8/WDxnNwtaTph02Z6v1AjikFj+ViCRAoGAWw7e\n6RzhAQJCTfoTMMUonxFZ2/UjEb7q0ip+WPTEKgGR59cddsYcDdLCJGak0cso1eQT\nwviodSPjsiRCrZoc94Odz/KWbXTNdQ6fL9RSb1RwHJUM7xOG1jlSGiZX7rT0hHgC\nHLlRW5wp9LVPiv39XC21qrpGczSO9TAD2I0NQ5kCgYBRRBr5/pmw5532OIvt/fOs\nFPj8AcEgxO5FCgQ/mx2TiganxTRbgkwd+fVQE8OWgXJv1u2FjqH1nOM20mfUW6Fx\nncbRc4Q7sF4CaHtTb/nHsewwKUmmI+nKNMrnqO4kt0Yzr94N/CAl1bOo89BQLNWj\nm3dXSE9aaW15GIwHwsIF+w==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-7swq8@digitomize-34727.iam.gserviceaccount.com",
    "client_id": "109064874300502805255",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7swq8%40digitomize-34727.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  // console.log(firebaseCredentials);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials)
  });
  // Set up user routes
  app.use('/user', userRoutes);
  app.use('/admin', adminRoutes);
  app.use('/sheets', sheetRoutes);
  app.use('/questions', questionRoutes);
}

async function setupContestServer () {
  await dataSyncer.syncContests();
  setInterval(dataSyncer.syncContests, 90 * 60 * 1000);

  // Update contests data and sync contests data at regular intervals
  await contestSyncer.updateContests();
  setInterval(contestSyncer.updateContests, 60 * 60 * 1000);

  // Pinging the server every 13 minutes
  setInterval(
    async () => {
      try {
        await main();
        console.log('<=======Sent GET request to AWAKE');
      } catch (error) {
        console.error('Error Pinging', error);
      }
    },
    13 * 60 * 1000
  );

  // Set up contest routes
  app.use('/contests', contestRoutes);
}

async function setupCommunityServer () {
  app.use('/community', communityRoutes);
}

async function startServersProduction () {
  try {
    app.use(cors());
    app.use(bodyParser.json());

    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected.');

    await setupUserServer();
    await setupContestServer();

    // Handle unhandled routes
    app.all('*', (req, res, next) => {
      res.status(404).json({ error: `${req.originalUrl} route not found` });
    });

    const servers = [];
    servers.push('User');
    servers.push('Contest');

    console.log('┌──────────────────────────────────┐');
    if (servers.length > 0) {
      for (const server of servers) {
        console.log('│ Server active:', server.padEnd(18) + '│');
      }
      console.log('├──────────────────────────────────┤');
    }
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`│ Server listening on port ${port}`.padEnd(35) + '│');
      console.log('└──────────────────────────────────┘');
    });
  } catch (err) {
    console.log('Error starting servers:', err);
  }
}

async function startServersDev () {
  try {
    app.use(cors());
    app.use(bodyParser.json());

    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB Connected.');
    const servers = [];
    if (process.env.USERS === 'true') {
      await setupUserServer();
      servers.push('User');
      await setupCommunityServer();
      servers.push('Community');
    }
    if (process.env.CONTESTS === 'true') {
      await setupContestServer();
      servers.push('Contest');
    }

    // Handle unhandled routes
    app.all('*', (req, res, next) => {
      res.status(404).json({ error: `${req.originalUrl} route not found` });
    });

    console.log('┌──────────────────────────────────┐');
    if (servers.length > 0) {
      for (const server of servers) {
        console.log('│ Server active:', server.padEnd(18) + '│');
      }
      console.log('├──────────────────────────────────┤');
    }
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`│ Server listening on port ${port}`.padEnd(35) + '│');
      console.log('└──────────────────────────────────┘');
    });
  } catch (err) {
    console.log('Error starting servers:', err);
  }
}

if (process.env.NODE_ENV === 'development') {
  startServersDev();
} else if (process.env.NODE_ENV === 'production') {
  startServersProduction();
} else {
  console.log('Error: NODE_ENV not set.');
}

// Handling unhandled server errors
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  });
});
