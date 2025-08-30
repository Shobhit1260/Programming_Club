const axios = require('axios');
const getLeetCodeUserStats = async (username) => {
  if (!username || typeof username !== 'string') {
    return { valid: false, message: 'Invalid username input' };
  }
  const headers = {
    'Content-Type': 'application/json',
    'Referer': `https://leetcode.com/${username}/`,
    'Origin': 'https://leetcode.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  try {
    // ✅ First Query: Submission Stats
    const statsQuery = `
        query userProblemsSolved($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `;
    const statsResponse = await axios.post(
      'https://leetcode.com/graphql',
      { query: statsQuery, variables: { username } },
      { headers }
    );

    const matchedUser = statsResponse?.data?.data?.matchedUser;

  
    if (!matchedUser) {
      return {
          valid: true,
          username,
          totalSolved: 0,
          rating: 0,
          globalRanking: 0,
          contestsAttended: 0,

      };
    }

    const totalSolved = matchedUser.submitStats.acSubmissionNum.find(
      (entry) => entry.difficulty === 'All'
    )?.count || 0;

    // ✅ Second Query: Contest Info
    const contestQuery = `
        query userContestRankingInfo($username: String!) {
          userContestRanking(username: $username) {
            rating
            globalRanking
            attendedContestsCount
          }
        }
      `;

    const contestResponse = await axios.post(
      'https://leetcode.com/graphql',
      { query: contestQuery, variables: { username } },
      { headers }
    );

    const contestInfo = contestResponse?.data?.data?.userContestRanking || {};

    return {
      valid: true,
      username,
      totalSolved,
      rating: contestInfo.rating || 0,
      globalRanking: contestInfo.globalRanking || 0,
      contestsAttended: contestInfo.attendedContestsCount || 0,
    };
  } catch (err) {
    return { valid: false, message: 'Failed to fetch data from LeetCode' };
  }
};

const getGfgData = async (gfgId) => {
  const gfgUrl = `https://leetcode-gfg-codechef-api.vercel.app/geeksforgeeks/user/${gfgId}/complete`;
  try {
    const response = await axios.get(gfgUrl);
    if (response.status === 200 && response.data && response.data.success && response.data.data) {
      const stats = response.data.data.statistics;
      return {
        username: response.data.data.username || gfgId,
        totalSolved: stats?.totalProblemsSolved || 0,
        easySolved: stats?.easyProblemsSolved || 0,
        mediumSolved: stats?.mediumProblemsSolved || 0,
        hardSolved: stats?.hardProblemsSolved || 0,
      };
    } else {
      throw new Error('Server Error: Unable to fetch GFG data');
    }
  } catch (error) {
    throw new Error('Server Error: Unable to fetch GFG data');
  }
}

const getLeetcodeData = async (leetcodeId) => {
  try {
    const leetcodeData = await getLeetCodeUserStats(leetcodeId);
    return leetcodeData;
  } catch (err) {
    throw new Error("Invalid GFG Id");
  }
}

const getCodeForcesData = async (codeforcesId) => {
  const codeforcesUrl = `https://competeapi.vercel.app/user/codeforces/${codeforcesId}`;
  try {
    const response = await axios.get(codeforcesUrl);
    if(response.status=== 200 && response.data[0]?.error=== "User not found") {
      return 0;
    }
    if (response.status === 200 ) {
      const ratings = response.data[1]?.ratings;
      if (Array.isArray(ratings) && ratings.length > 0) {
        const lastContest = ratings[ratings.length - 1];
        const lastRating = lastContest.newRating;
        return lastRating;
      } else {
        return 0;
      }
    } else {
      // console.log("problem is here 1");
      throw new Error('Invalid Codeforces ID');
    }
  } catch (error) {
    // console.log("problem is here 2");
    throw new Error(error.message || 'Invalid Codeforces ID');
  }
}


const getCodeChefData = async (codechefId) => {
  if (codechefId) {
    const ccUrl = `https://leetcode-gfg-codechef-api.vercel.app/codechef/user/${codechefId}`;
    try {
      const response = await axios.get(ccUrl);
      if (response.status === 404) return 0;
      if (response.status === 200 && response.data && response.data.success) {
        const ratingcc = response.data.data?.currentRating;
        return ratingcc ?? 0;
      } else {
        throw new Error('Server Error: Unable to fetch CodeChef data');
      }
    } catch (error) {
      throw new Error("Server Error: Unable to fetch CodeChef data");
    }
  }
}

module.exports = {
  getGfgData,
  getLeetcodeData,
  getCodeForcesData,
  getCodeChefData
};

