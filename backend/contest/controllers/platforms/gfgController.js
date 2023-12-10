// ? API to mongodb function

import https from 'https'

async function geeksforgeeks_c() {
  const url =
    'https://practiceapi.geeksforgeeks.org/api/v1/events/?type=contest&page_number=1&sub_type=all'

  const promise = new Promise((resolve, reject) => {
    https.get(url, function (response) {
      if (response.statusCode === 200) {
        resolve(response)
      } else {
        reject(new Error('Error getting contests'))
      }
    })
  })

  const filteredContestsPromise = promise.then(function (response) {
    let list = ''

    response.on('data', function (data) {
      list += data
    })

    return new Promise((resolve) => {
      response.on('end', function () {
        try {
          const contestList = JSON.parse(list.toString())
          // console.log(contestList.results.upcoming);
          const filteredContests = contestList.results.upcoming.map(
            (contest) => ({
              host: 'geeksforgeeks',
              name: contest.name,
              vanity: contest.slug,
              url: 'https://practice.geeksforgeeks.org/contest/' + contest.slug,
              // startTimeIST: formatStartTimeIST(contest.start_time),
              startTimeUnix: Math.floor(
                new Date(
                  new Date(contest.start_time).getTime() - 5.5 * 60 * 60 * 1000
                ).getTime() / 1000
              ), //! issue for GFG
              //   endtime: Math.floor(new Date(contest.end_time).getTime() / 1000),
              duration:
                Math.floor(new Date(contest.end_time).getTime() / (60 * 1000)) -
                Math.floor(
                  new Date(contest.start_time).getTime() / (60 * 1000)
                ),
            })
          )

          resolve(filteredContests)
        } catch (error) {
          console.log('Error parsing JSON:', error)
          resolve([])
        }
      })
    })
  })

  return filteredContestsPromise
}

function formatStartTimeIST(start_time) {
  const date = new Date(start_time)
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const startTimeIST = date.toLocaleString('en-US', options)
  return startTimeIST
}

export default {
  geeksforgeeks_c,
}
