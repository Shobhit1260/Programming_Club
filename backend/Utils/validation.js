const validator = require('validator');
const axios = require('axios');


const validategfgCodingPlatform = async (req) => {
    const { gfgId } = req.body;
    if(!gfgId || typeof gfgId !== 'string') {
        throw new Error('Invalid GFG ID');
    }
    if (gfgId) {
        const gfgUrl = `https://geeks-for-geeks-api.vercel.app/${gfgId}`;
        try {
            const response = await axios.get(gfgUrl);
            if (response.data && response.data.info && response.data.info.userName === gfgId) {
                return true;
            } else {
                throw new Error('Invalid GFG ID');
            }
        } catch (error) {
            throw new Error('Invalid GFG ID');
        }
    }
}

const validateCodeForcesCodingPlatform = async (req) => {
    const { codeforcesId } = req.body;
    if(!codeforcesId || typeof codeforcesId !== 'string') {
        throw new Error('Invalid CodeForces ID');
    }
    if (codeforcesId) {
        const cfUrl = `https://competeapi.vercel.app/user/codeforces/${codeforcesId}`;
        try {
            const response = await axios.get(cfUrl);
            if(response.status === 200 && response.data[0]?.error === "User not found") {
                throw new Error(response.data.error);
            }
            else if (response.status === 200 && response.data[0]?.lastName) {
                console.log("CodeForces ID is valid");
                return true;
            } else {
                throw new Error("Server Error: Unable to fetch CodeForces data");
            }
        } catch (error) {
            throw new Error('Server Error: Unable to fetch CodeForces data');   
        }
    }
}

const validateCodeChefCodingPlatform = async (req) => { 
    const { codechefId } = req.body;
    if (!codechefId || typeof codechefId !== 'string') {
        throw new Error('Invalid CodeChef ID');
    }
    const ccUrl = `https://competeapi.vercel.app/user/codechef/${codechefId}`;
    try {
        const response = await axios.get(ccUrl);
        if (response.status === 200 && response.data?.error === "User not found") {
           console.log("PROBLEM IS HERE 1");
           throw new Error(response.data.error);
        } else if (
            response.status === 200  &&
            response.data &&
            response.data.username
        ) {
            return true;
        } else {
            console.log("PROBLEM IS HERE 2");
            throw new Error("Server Error: Unable to fetch CodeChef data");
        }
    } catch (error) {
        console.log("PROBLEM IS HERE 3");
        throw new Error(error.message);
    }
}

const validateLeetCodeCodingPlatform = async (req) => { 
    const { leetcodeId } = req.body;
    const response = await checkLeetCodeProfileExists(leetcodeId);
    if (response) {
        return true;
    } else {
        throw new Error('Invalid LeetCode ID 1');
    }   
}
const checkLeetCodeProfileExists = async (username) => {
  if (!username || typeof username !== 'string') {
    throw new Error('Invalid LeetCode ID 1');
  }
  const headers = {
    'Content-Type': 'application/json',
    'Referer': `https://leetcode.com/${username}/`,
    'Origin': 'https://leetcode.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };
  const query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        username
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables: { username } },
      { headers }
    );
    const matchedUser = response?.data?.data?.matchedUser;
    return !!matchedUser;
  } catch (err) {
      throw new Error('Invalid LeetCode ID 2');
    }
};

  
module.exports = {
    validategfgCodingPlatform,
    validateCodeForcesCodingPlatform,
    validateCodeChefCodingPlatform,
    validateLeetCodeCodingPlatform
}