import axios from 'axios';
import { Potd } from "../models/Potd.js";

const leetcodeController = async (req, res) => {
    try {
        const formattedDate = new Date();
        const formattedOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const today = formattedDate.toLocaleDateString('en-GB', formattedOptions);
        let potd = await Potd.findOne({ platform: "leetcode", date: today });

        if (!potd) {
            potd = await fetchLeetcodePotdFromExternalAPI();
            potd.platform = "leetcode";
            console.log("Fetched POTD from external API:", potd);
            await Potd.create(potd);
        }

        res.json({ problemName: potd.problemName, problemUrl: potd.problemUrl, date: potd.date, platform: potd.platform });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchLeetcodePotdFromExternalAPI = async () => {
    const query = {
        operationName: "codingChallengeMedal",
        variables: { year: 2024, month: 2 },
        query: `
        query codingChallengeMedal{
            activeDailyCodingChallengeQuestion {
                link
                date
            }
        }
    `
    };

    try {
        console.log("Fetching POTD from external API");
        const { data } = await axios.post('https://leetcode.com/graphql', query);

        const link = data?.data?.activeDailyCodingChallengeQuestion?.link;
        const parts = link.split('/');
        const problemName = parts[parts.length - 2];

        const transformedName = problemName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const formattedDate = new Date(data?.data?.activeDailyCodingChallengeQuestion?.date);
        const formattedOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedLeetCodeDate = formattedDate.toLocaleDateString('en-GB', formattedOptions);

        const potd = {
            problemName: transformedName,
            problemUrl: "https://leetcode.com" + link,
            date: formattedLeetCodeDate,
        };

        return potd;
    } catch (error) {
        console.error("Error fetching POTD from external API:", error);
        throw new Error("Failed to fetch POTD from external API");
    }
};

const gfgController = async (req, res) => {
    try {
        const formattedDate = new Date();
        const formattedOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const today = formattedDate.toLocaleDateString('en-GB', formattedOptions);
        let potd = await Potd.findOne({ platform: "geeksforgeeks", date: today });

        if (!potd) {
            potd = await fetchGFGPotdFromExternalAPI();
            potd.platform = "geeksforgeeks";
            console.log("Fetched POTD from external API:", potd);
            await Potd.create(potd);
        }

        res.json({ problemName: potd.problemName, problemUrl: potd.problemUrl, date: potd.date, platform: potd.platform });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchGFGPotdFromExternalAPI = async () => {
    try {
        console.log("Fetching POTD from external API");
        const {data} = await axios.get('https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today');
        console.log(data);
        const potd = {
            problemName: data.problem_name,
            problemUrl: data.problem_url,
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        };

        return potd;
    } catch (error) {
        console.error("Error fetching POTD from external API:", error);
        throw new Error("Failed to fetch POTD from external API");
    }
}

export { leetcodeController, gfgController };
