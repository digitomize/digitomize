import https from "https";

function fetchHackathons(list){
  const formattedHackathonsPromise = new Promise((resolve) => {
    try{
      const hackathonsList = JSON.parse(list.toString());
      const formattedHackathons = hackathonsList.data.data.map((hackathon) => ({
        name:hackathon.title,
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

      resolve(formattedHackathons);
    }catch(error){
      console.log("Error parsing JSON:", error);
      resolve([]);
    }
  });

  return formattedHackathonsPromise;
}

async function fetchPageWise (pageNumber) {
  const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=${pageNumber}&per_page=10&oppstatus=open`;

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

    return new Promise((resolve) => {
      response.on("end", async function () {
        const hackathons = await fetchHackathons(list);
        resolve(hackathons);
      });
    })
  });

  return hackathonsPromise;
}

async function unstop_c(){
  const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=hackathons&page=1&per_page=10&oppstatus=open`;
  
  const promise = new Promise((resolve, reject) => {
    https.get(url, function (response) {
      if (response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error("Error getting hackathons."));
      }
    });
  });

  let listOfHackathons = [];

  const hackathonsListPromise = promise.then((response) => {
    let list = "";

    response.on("data", function (data) {
      list += data;
    });

    return new Promise((resolve) => {
      response.on("end",async function () { 
        try{
          const firstPageHackathons = await fetchHackathons(list);
          listOfHackathons.push(...firstPageHackathons);
          
          const hackathonsList = JSON.parse(list.toString());
    
          const totalHackathons = hackathonsList.data.total;
          const hackathonsPerPage = hackathonsList.data.per_page;
    
          for(let pageNumber = 2;pageNumber <= Math.ceil(totalHackathons / hackathonsPerPage);++pageNumber){
            const hackathons = await fetchPageWise(pageNumber);
            listOfHackathons.push(...hackathons);
          }
    
          resolve(listOfHackathons);
        }catch(error){
          console.log("Error parsing JSON:", error);
          resolve([]);
        }
      });
    })
  });

  return hackathonsListPromise;
}

export default {
  unstop_c,
}