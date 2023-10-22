import User from '../models/User.js';


// Utility function to create default contest object
function createDefaultContestObject(platformData) {
    const commonDefaults = { rating: null, badge: null, fetchTime: 0, attendedContestsCount: null };

    if (platformData) {
        return {
            showOnWebsite: platformData.showOnWebsite || false,
            username: platformData.username || null,
            ...commonDefaults
        };
    } else {
        return undefined;
    }
}

// Takes the data and creates a new User in MongoDB
const setUser = async (userData) => {
    console.log(userData);
    try {
        const { uid, username, name, picture, email_verified, email, email_show, bio, dateOfBirth, phoneNumber, github, codechef, leetcode, codeforces } = userData;
        const newUser = new User({
            uid,
            username: username || uid,
            name,
            picture: picture || null,
            email,
            email_verified,
            email_show: email_show || undefined,
            bio: bio
                ? {
                    showOnWebsite: bio.showOnWebsite || false,
                    data: bio.data || null
                }
                : undefined,
            dateOfBirth: dateOfBirth
                ? {
                    showOnWebsite: dateOfBirth.showOnWebsite || false,
                    data: dateOfBirth.data || null
                }
                : undefined,
            phoneNumber: phoneNumber
                ? {
                    showOnWebsite: phoneNumber.showOnWebsite || false,
                    data: phoneNumber.data || null
                }
                : undefined,
            github: github
                ? {
                    showOnWebsite: github.showOnWebsite || false,
                    data: github.data || null
                }
                : undefined,
            codechef: createDefaultContestObject(codechef),
            leetcode: createDefaultContestObject(leetcode),
            codeforces: createDefaultContestObject(codeforces)
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        if (error.code === 11000) {
            console.log(error);
            const key = Object.keys(error.keyValue)[0];
            const message = `User with this ${key} already exists`;
            throw { status: 200, message }; // Throw custom error object
        }
        console.error("Error:", error);
        throw { status: 500, message: 'Error creating user' }; // Throw custom error object
    }
};

export {
    setUser
}