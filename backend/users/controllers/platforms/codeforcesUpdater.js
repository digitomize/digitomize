const https = require("https");

async function codeforces_u(handle) {
    if (!handle) {
        return null;
    }

    const url = `https://codeforces.com/api/user.info?handles=${handle}`;
    const url2 = `https://codeforces.com/api/user.rating?handle=${handle}`;

    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const userInfo = JSON.parse(data);
                    resolveUserInfo(userInfo, resolve, reject);
                } catch (error) {
                    console.log('Error parsing JSON:', error);
                    resolve({});
                }
            });
        });

        request.on('error', (error) => {
            console.log('Error getting user info:', error);
            reject(error);
        });
    });
}

async function resolveUserInfo(userInfo, resolve, reject) {
    if (userInfo.status === "OK" && userInfo.result.length > 0) {
        const handle = userInfo.result[0].handle;
        const rating = userInfo.result[0].rating;
        const rank = userInfo.result[0].rank;

        // Fetching additional data from url2
        const url2 = `https://codeforces.com/api/user.rating?handle=${handle}`;
        const request2 = https.get(url2, (response2) => {
            let data2 = '';

            response2.on('data', (chunk2) => {
                data2 += chunk2;
            });

            response2.on('end', () => {
                try {
                    const userRatingInfo = JSON.parse(data2);
                    const attendedContests = userRatingInfo.result.map(item => {
                        return {
                            contestId: item.contestId,
                            contestName: item.contestName,
                            rating: item.rating
                        };
                    });
                    console.log('attendedContests:', attendedContests);
                    resolve({
                        handle,
                        rating,
                        rank,
                        attendedContests  // Added attendedContests here
                    });
                } catch (error) {
                    console.log('Error parsing JSON from url2:', error);
                    resolve({
                        handle,
                        rating,
                        rank,
                        attendedContests: []
                    });
                }
            });
        });

        request2.on('error', (error) => {
            console.log('Error getting user rating info:', error);
            resolve({
                handle,
                rating,
                rank,
                attendedContests: [] 
            });
        });
    } else {
        resolve({});
    }
}
module.exports = {
    codeforces_u,
};
