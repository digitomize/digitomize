import https from 'https';


async function leetcode_u(handle) {
    if (!handle) {
        return null; 
    }
    const url = 'https://leetcode.com/graphql';

    const query = {
        operationName: 'getContentRankingData',
        variables: { username: handle },
        query: `
      query getContentRankingData($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          __typename
        }
      }
    `,
    };

    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const request = https.request(url, options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const userInfo = JSON.parse(data);
                    console.log("OKKKKKKKKK", userInfo);
                    if (userInfo.data?.userContestRanking == undefined) {
                        userInfo.data = userContestRanking;
                        userInfo.data.userContestRanking = {
                            attendedContestsCount: 0,
                            rating: 0,
                            globalRanking: 0,
                        }
                    }
                    userInfo.data.userContestRanking.rank = "none";
                    userInfo.data.userContestRanking.handle = handle;


                    //   console.log("HERRRREEEEE:",userInfo.data.userContestRanking);
                    resolve(userInfo.data.userContestRanking);
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

        request.write(JSON.stringify(query));
        request.end();
    });
}

export {
    leetcode_u,
};