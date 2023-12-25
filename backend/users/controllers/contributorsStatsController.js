import { promises as fsPromises } from 'fs';
import path from 'path';
import cron from 'node-cron';


//fetch contributors from file
const fetchContributorsFromFile = async () => {
  try {
    const filename = path.join('users', './../../.all-contributorsrc');
    const filedata = await fsPromises.readFile(filename, 'utf8');

    const data = JSON.parse(filedata);
    const contributors = data.contributors;
    return contributors;
  } catch (error) {
    console.error('Error reading file or parsing JSON:', error);
    return null;
  }
};

//fetch github info
const fetchGitHubInfo = async () => {
    try{
        const apiUrl = 'https://api.github.com/repos/digitomize/digitomize';
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching information from the GitHub API', error);
        return null;
    }
} 

// Function to update contributors and statistics
async function updateContributorsAndStats() {
    const githubInfo = await fetchGitHubInfo();
    const allContributors = await fetchContributorsFromFile();
    return { githubInfo, allContributors };
}

// Schedule the update every 12 hours
cron.schedule('0 */12 * * *', () => {
    updateContributorsAndStats();
  });

// main controller
export const stats = async (req, res) => {
    
    const { githubInfo, allContributors } = await updateContributorsAndStats();


    console.log({
      star: githubInfo.stargazers_count,
      contributorsInfo : allContributors,
      totalNumberOfContributors: allContributors.length,
    });

    res
    .status(200)
    .json({
        star: githubInfo.stargazers_count,
        contributorsInfo : allContributors,
        totalNumberOfContributors: allContributors.length,
        linkedInFollowers: "750+",
        totalViews: '27k+'
    })

}