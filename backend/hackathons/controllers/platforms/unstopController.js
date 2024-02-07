import https from "https";

async function fetchPageWise (url, page) {
  const promise = new Promise((resolve, reject) => {
    https.get(url, function (response) {
      if (response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error("Error getting hackathons."));
      }
    });
  });

  const hackathonsPromise = promise.then(function (response) {
    let list = "";

    response.on("data", function (data) {
      list += data;
    });

    return new Promise((resolve, reject) => {
      response.on("end", async function () {
        try{
          const hackathonsList = JSON.parse(list.toString());

          const formattedHackathons = hackathonsList.data.data.map((hackathon) => ({
            host:"unstop",
            name:hackathon.title,
            vanity: hackathon.id,
            url:`https://unstop.com/${hackathon.public_url}`,
            registerationStartTimeUnix: Math.floor(
              new Date(hackathon.regnRequirements.start_regn_dt).getTime() / 1000
            ),
            registerationEndTimeUnix: Math.floor(
              new Date(hackathon.regnRequirements.end_regn_dt).getTime() / 1000
            ),
            hackathonStartTimeUnix: Math.floor(
              new Date(hackathon.start_date).getTime() / 1000
            ),
            duration: Math.floor(
              (
                Math.floor(new Date(hackathon.end_date).getTime() / 1000) - 
                Math.floor(new Date(hackathon.start_date).getTime() / 1000)
              ) / 60
            ),
          }));

          if(page === 1) {
            resolve([formattedHackathons,hackathonsList.data.total,hackathonsList.data.per_page]);
          } else {
            resolve(formattedHackathons);
          }
        }catch(error){
          if(page === 1) {
            reject(new Error("Error parsing JSON: ", error));
          } else {
            resolve([]);
          }
        }
      });
    });
  }).catch((error) => {
    return new Promise((resolve, reject) => {
      if(page === 1) {
        reject(new Error(error));
      } else {
        resolve([]);
      }
    });
  });

  return hackathonsPromise;
}

async function fetchHackathons () {
  const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&per_page=10&oppstatus=open`;
  
  return new Promise(async (resolve) => {
    let listOfHackathons = [];
    try{
      // Fetch first page.
      const firstPageHackathons = await fetchPageWise(`${url}&page=1`,1);
      listOfHackathons.push(...firstPageHackathons[0]);

      const totalHackathons = firstPageHackathons[1];
      const per_page = firstPageHackathons[2];

      // Fetch other pages hackathon.
      for(let pageNumber = 2; pageNumber <= Math.ceil(totalHackathons / per_page); ++pageNumber){
        const hackathons = await fetchPageWise(`${url}&page=${pageNumber}`, pageNumber);
        listOfHackathons.push(...hackathons);
      }

      resolve(listOfHackathons);
    }catch(error){
      console.log(error);
      resolve([]);
    }
  });
}

async function unstop_c(){
  const hackathonsListPromise = fetchHackathons();
  return hackathonsListPromise;
}

export default {
  unstop_c,
}