import https from "https";

async function fetchPageWise (from, size, type) {
  return new Promise((resolve, reject) => {
    const postFields = JSON.stringify({
      from: from,
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
        try {
          const json = JSON.parse(data);

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
          
          if(from === 0) {
            resolve([formattedHackathons,json.hits.total.value]);
          } else {
            resolve(formattedHackathons);
          }
        } catch (error) {
          if(from === 0) {
            // When fetching first page from is 0.
            reject(new Error("Error parsing JSON:", error));
          } else {
            resolve([]);
          }
        }
      });
    });
  
    req.on("error", (error) => {
      reject(error);
    });
  
    req.write(postFields);
    req.end();
  });
}

async function fetchHackathons (type) {
  return new Promise(async (resolve) => {
    let listOfHackathons = [];
    try{
      // Fetch first page.
      const firstPageHackathons = await fetchPageWise(0, 10, type);
      listOfHackathons.push(...firstPageHackathons[0]);
      const totalHackathons = firstPageHackathons[1];
      
      // fetch rest of the pages.
      if(totalHackathons > 10) {
        const restOfHackathons = await fetchPageWise(10, totalHackathons, type);
        listOfHackathons.push(...restOfHackathons);
      }

      resolve(listOfHackathons);
    }catch(error){
      console.log(error);
      resolve([]);
    }
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

  return listOfHackathons;
}

export default {
    devfolio_c,
}