import https from "https";
import cheerio from "cheerio";
import axios from "axios";

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

    return new Promise((resolve) => {
      response.on("end", async function () {
        try{
          const hackathonsList = JSON.parse(list.toString());
          const formattedHackathons = hackathonsList.hackathons.map(async (hackathon) => {
              const hackathonInfo = {};
  
              hackathonInfo.host = "devpost";
              hackathonInfo.name = hackathon.title;
              hackathonInfo.url = hackathon.url;
    
              const url = `${hackathon.url}details/dates`;
    
              try{
                const response = await axios.get(url);    
                const $ = cheerio.load(response.data);
    
                const htmlElement = `#container .row .small-12 .row .large-12 table tbody > tr:first-child`;
                const starts_at_iso = $(`${htmlElement} td:nth-child(2)`).attr("data-iso-date");
                const ends_at_iso = $(`${htmlElement} td:nth-child(3)`).attr("data-iso-date");
    
                const startTimeUnix = Math.floor(new Date(starts_at_iso).getTime() / 1000);
                const endTimeUnix = Math.floor(new Date(ends_at_iso).getTime() / 1000);
    
                hackathonInfo.hackathonStartTimeUnix = startTimeUnix;
                hackathonInfo.duration = Math.floor((endTimeUnix - startTimeUnix) / 60);
    
                hackathonInfo.registerationStartTimeUnix = startTimeUnix;
                hackathonInfo.registerationEndTimeUnix = endTimeUnix;
              }catch(error){
                console.log("Page not found " + error.response.status);
              }
    
              return hackathonInfo;
          });
    
          Promise.all(formattedHackathons).then((data) => {
            if(page === 1) {
              resolve([data,hackathonsList.meta.total_count,hackathonsList.meta.per_page]);
            } else {
              resolve(data);
            }
          });
    
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
  const url = `https://devpost.com/api/hackathons?challenge_type[]=online&status[]=upcoming&status[]=open`;

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

async function devpost_c(){
  const hackathonsListPromise = fetchHackathons();
  return hackathonsListPromise;
}

export default {
    devpost_c,
}