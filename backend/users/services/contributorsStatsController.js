// fetch contributors from file
const fetchContributorsFromFile = async () => {
  try {
    const fileData = await fetch("https://raw.githubusercontent.com/digitomize/digitomize/main/.all-contributorsrc");

    if (!fileData) throw new Error("No data found");

    const data = await fileData.json();

    const contributors = data.contributors;

    if (!contributors) throw new Error("No data found");
    
    return {
      contributors: contributors.map((contributor) => ({
        name: contributor.name,
        avatar: contributor.avatar_url,
        profile: contributor.profile,
        contributions: contributor.contributions,
      })),
    };
  } catch (error) {
    console.error("Error reading file or parsing JSON:", error);
    return null;
  }
};

// fetch github info
const fetchGitHubInfo = async () => {
  try {
    const apiUrl = "https://api.github.com/repos/digitomize/digitomize";
    const response = await fetch(apiUrl);

    if (response.status === 403) {
      // GitHub API rate limit exceeded
      console.error("GitHub API rate limit exceeded. Please try again later.");
      return null;
    }

    const data = await response.json();

    if (!data) throw new Error("No data found");

    return data;
  } catch (error) {
    console.error("Error fetching information from the GitHub API", error);
    return null;
  }
};


// Function to update contributors and statistics
async function updateContributorsAndStats() {
  try {
    const githubInfo = await fetchGitHubInfo();
    const allContributors = await fetchContributorsFromFile();

    if (!(githubInfo && allContributors)) {
      throw new Error("Error occurred in fetching data");
    }

    return { githubInfo, allContributors };
  } catch (error) {
    console.error("Error occurred in fetching updated data", error);

    // Returning a meaningful response or throwing a new error
    // depending on your use case
    return { error: "Error occurred in fetching updated data" };
    // OR
    // throw new Error("Error occurred in fetching updated data");
  }
}

// Schedule the update every 12 hours
const scheduleUpdate = async () => {
  try {
    const { githubInfo, allContributors, error } = await updateContributorsAndStats();

    if (error) {
      console.error("Error in updating contributors and stats:", error);
      return;
    }

    // Reschedule the update after 12 hours
    setTimeout(scheduleUpdate, 12 * 60 * 60 * 1000);
  } catch (catchError) {
    console.error("Unexpected error in stats endpoint:", catchError);
  }
};

// Schedule the first update
setTimeout(scheduleUpdate, 0);


// main controller
export const stats = async (req, res) => {
  try {
    const { githubInfo, allContributors, error } = await updateContributorsAndStats();

    if (error) {
      console.error("Error in updating contributors and stats:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({
      star: githubInfo.stargazers_count,
      allContributors: allContributors.contributors,
      totalNumberOfContributors: allContributors.contributors.length,
      linkedInFollowers: "750+",
      totalViews: "27k+",
    });
  } catch (catchError) {
    console.error("Unexpected error in stats endpoint:", catchError);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
