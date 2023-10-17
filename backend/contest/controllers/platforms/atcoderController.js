const https = require('https');
const cheerio = require('cheerio');
// const { parseISO, getTime } = require('date-fns');

async function atcoder_c() {
    const url = 'https://atcoder.jp/contests';

    const promise = new Promise((resolve, reject) => {
        https.get(url, function (response) {
            if (response.statusCode === 200) {
                resolve(response);
            } else {
                reject(new Error('Error getting contests'));
            }
        });
    });

    const filteredContestsPromise = promise.then(function (response) {
        let data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });

        return new Promise((resolve) => {
            response.on('end', function () {
                const $ = cheerio.load(data);
                const upcomingContests = [];

                $('#contest-table-upcoming tbody tr').each((index, element) => {
                    const contestInfo = {};

                    const startTimeElement = $(element).find('.text-center a');
                    const startTimeLink = startTimeElement.attr('href');
                    const isoMatch = startTimeLink.match(/iso=([^&]+)/);
                    if (isoMatch) {
                        const iso = isoMatch[1];
                        // console.log(iso);
                        // const date = parseISO(iso);
                        // const unixTimestamp = !isNaN(getTime(date)) ? getTime(date) / 1000 : 'Invalid ISO';
                        const year = parseInt(iso.substring(0, 4));
                        const month = parseInt(iso.substring(4, 6)) - 1; // Months are zero-indexed in JavaScript
                        const day = parseInt(iso.substring(6, 8));
                        const hour = parseInt(iso.substring(9, 11));
                        const minute = parseInt(iso.substring(11, 13));

                        // Create a new Date object
                        const date = new Date(year, month, day, hour, minute);
                        const unixTimestamp = date.getTime() / 1000 - 9 * 60 * 60; //! issue for AtCoder timezone
                        // console.log(unixTimestamp);
                        // console.log(unixTimestamp);
                        // console.log(unixTimestamps);
                        contestInfo.startTimeUnix = unixTimestamp;
                    } else {
                        contestInfo.startTimeUnix = 'Invalid ISO';
                    }

                    contestInfo.name = $(element).find('td:nth-of-type(2) a').text().trim();
                    const numberMatch = contestInfo.name.match(/(\d{3})\D*$/);
                    const contestNumber = numberMatch ? numberMatch[1] : 'N/A';

                    contestInfo.host = "AtCoder";
                    contestInfo.vanity = `abc${contestNumber}`;
                    contestInfo.url = `https://atcoder.jp/contests/abc${contestNumber}`;

                    const durationText = $(element).find('td:nth-of-type(3)').text().trim();
                    const [hours, minutes] = durationText.split(':').map(Number);
                    const totalMinutes = hours * 60 + minutes;

                    contestInfo.duration = totalMinutes;

                    upcomingContests.push(contestInfo);
                });

                resolve(upcomingContests);
            });
        });
    });

    return filteredContestsPromise;
}

module.exports = {
    atcoder_c,
};
