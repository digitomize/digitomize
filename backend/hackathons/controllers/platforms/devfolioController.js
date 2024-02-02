import https from "https";

function fetchFormattedHackathons(json) {
  const formattedHackathons = json.hits.hits.map((hackathon) => ({
    name: hackathon._source.name,
    url:`https://${hackathon._source.slug}.devfolio.co`,
    registerationStartTimeUnix: Math.floor(
      new Date(hackathon._source.hackathon_setting.reg_starts_at).getTime() / 1000
    ),
    registerationEndTimeUnix: Math.floor(
      new Date(hackathon._source.hackathon_setting.reg_ends_at).getTime() / 1000
    ),
    hackathonStartTimeUnix: Math.floor(
      new Date(hackathon._source.starts_at).getTime() / 1000
    ),
    duration: Math.floor(
      (
        Math.floor(new Date(hackathon._source.ends_at).getTime() / 1000) - 
        Math.floor(new Date(hackathon._source.starts_at).getTime() / 1000)
      ) / 60
    ),
  }));

  return formattedHackathons;
}

async function fetchOtherPages (size, type) {
  return new Promise((resolve) => {
    const postFields = JSON.stringify({
      from: 10,
      size: size,
      type: type,
    });

    const options = {
      hostname: 'api.devfolio.co',
      path: '/api/search/hackathons',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postFields.length
      }
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(data);
        const formattedHackathons = fetchFormattedHackathons(json);
        resolve(formattedHackathons);
      });
    });

    req.on("error", (error) => {
      console.log(error);
      resolve([]);
    });

    req.write(postFields);
    req.end();
  });
}

async function fetchHackathons (type) {
  return new Promise((resolve) => {
    let listOfHackathons = [];

    const postFields = JSON.stringify({
      from: 0,
      size: 10,
      type: type,
    });
  
    const options = {
      hostname: 'api.devfolio.co',
      path: '/api/search/hackathons',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postFields.length
      }
    };

    const req = https.request(options, (res) => {
      let data = "";
  
      res.on("data", (chunk) => {
        data += chunk;
      });
  
      res.on("end", async () => {
        try {
          const json = JSON.parse(data);
          
          const totalHackathons = json.hits.total.value;

          // fetching first page
          const firstPageHackathons = fetchFormattedHackathons(json);
          listOfHackathons.push(...firstPageHackathons);

          if(totalHackathons > 10) {
            const hackathons = await fetchOtherPages(totalHackathons, type);
            listOfHackathons.push(...hackathons);
          }

          resolve(listOfHackathons);
        } catch (error) {
          console.log(error);
          resolve([]);
        }
      });
    });
  
    req.on("error", (error) => {
      console.log(error);
      resolve([]);
    });
  
    req.write(postFields);
    req.end();
  });
}

async function devfolio_c() {
  let listOfHackathons = [];

  // list of Open hackathons
  const openHackathons = await fetchHackathons("application_open");

  // list of Upcoming hackathons
  const upcomingHackathons = await fetchHackathons("upcoming");

  listOfHackathons.push(...openHackathons);
  listOfHackathons.push(...upcomingHackathons);

  return new Promise((resolve) => {
    resolve(listOfHackathons);
  });
}

export default {
    devfolio_c,
}