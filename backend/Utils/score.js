const fixedMinMax = {
  problemsCountlc: { min: 0, max: 3000 },
  ratinglc: { min: 800, max: 2500 },
  ratingcf: { min: 800, max: 2000 },
  ratingcc: { min: 800, max: 2500 },
  problemsCountgfg: { min: 0, max: 3000 },
};
const weights = {
  problemsCountlc: 12.5,
  ratinglc: 12.5,
  ratingcf: 30,
  ratingcc: 30,
  problemsCountgfg: 15,
};
const normalize = async (value, min, max) => {
  // Guard: if min/max invalid, return 0 to avoid NaN propagation.
  if (typeof min !== 'number' || typeof max !== 'number' || !isFinite(min) || !isFinite(max) || max === min) {
    return 0;
  }
  const num = Number(value);
  if (!isFinite(num)) return 0;
  const normalized = ((num - min) / (max - min)) * 100;
  return Math.min(Math.max(normalized, 0), 100);
}

const calculateStudentScore = async (student) => {

  try{

    let finalScore = 0;
    for (const metric in weights) {
      const config = fixedMinMax[metric];
      if (!config) continue; // skip unknown metric
      const { min, max } = config;
      const rawValue = student[metric];
      const numericValue = Number(rawValue);
      const normalized = await normalize(numericValue, min, max);
      const weightPortion = Number(weights[metric]) / 100;
      if (isFinite(normalized) && isFinite(weightPortion)) {
        finalScore += normalized * weightPortion;
      }
    }
    if (!isFinite(finalScore)) finalScore = 0;
    return parseFloat(finalScore.toFixed(2)); // Return score rounded to 2 decimal places
  }
  catch(err){
    console.log(err.message);
    throw new Error("Error calculating score: " + err.message);
  }
}
module.exports = {
  calculateStudentScore,
}