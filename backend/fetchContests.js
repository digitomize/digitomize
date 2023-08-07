const https = require('https');

async function fetchContestsData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'digitomize-backend.onrender.com',
      path: '/api/contests',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

        res.on('end', () => {
        //   console.log("Req Sent to Server")
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

module.exports = fetchContestsData;
