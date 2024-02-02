import https from "https";
import cheerio, { html } from "cheerio";
import axios from "axios";

function fetchHackathons(list){
  const filteredhackathonsPromise = new Promise((resolve) => {
    try{
      const hackathonsList = JSON.parse(list.toString());
      const formattedHackathons = hackathonsList.hackathons.map(async (hackathon) => {
          const hackathonInfo = {};

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
          resolve(data);
      });

    }catch(error){
      console.log("Error parsing JSON:", error);
      resolve([]);
    }
  });

  return filteredhackathonsPromise;
}

async function fetchPageWise (pageNumber) {
  const url = `https://devpost.com/api/hackathons?challenge_type[]=online&status[]=upcoming&status[]=open&page=${pageNumber}`;

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

async function devpost_c(){
  const url = `https://devpost.com/api/hackathons?challenge_type[]=online&status[]=upcoming&status[]=open`;
  
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
          const firstPage = await fetchHackathons(list);
          listOfHackathons.push(...firstPage);
          
          const hackathonsList = JSON.parse(list.toString());
    
          const totalHackathons = hackathonsList.meta.total_count;
          const hackathonsPerPage = hackathonsList.meta.per_page;
    
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
    devpost_c,
}