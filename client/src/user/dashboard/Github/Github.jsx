import React, { useEffect, useState } from "react";
import { Github, Loader2, Star, GitFork } from "lucide-react";

const GithubProfile = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [githubUsername, setGithubUsername] = useState("");

  const fetchRepos = async (username) => {
    if (username) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=created&direction=desc`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const firstTenRepos = data.slice(0, 10);
        setRepositories(firstTenRepos);
        setError(null);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to load repositories. Please try again later.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("githubUsername", githubUsername);
    fetchRepos(githubUsername);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername");
    if (storedUsername) {
      setGithubUsername(storedUsername);
      fetchRepos(storedUsername);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 flex items-center">
        <Github className="mr-2" /> GitHub Repositories
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4 justify-center">
        <input
          type="text"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          placeholder="Enter GitHub Username"
          className="border rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white rounded px-4 py-2 hover:bg-primary/90 transition duration-300"
        >
          Fetch Repositories
        </button>
      </form>

      {repositories.length === 0 ? (
        <p className="text-muted-foreground text-center">No repositories found. Please enter a valid username.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <div key={repo.id} className="bg-card text-card-foreground rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 truncate">{repo.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 h-16 overflow-hidden">
                  {repo.description || "No description available."}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="w-4 h-4 mr-1" />
                    {repo.forks_count}
                  </div>
                </div>
              </div>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block w-full py-2 px-4 bg-primary text-white text-center hover:bg-primary/90 transition duration-300"
              >
                View Repository
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GithubProfile;
