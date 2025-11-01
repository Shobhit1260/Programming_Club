const mongoose = require('mongoose');
const { Leaderboard } = require('../Models/leaderboard');
const { Student } = require('../Models/students.js');
const { validategfgCodingPlatform, validateCodeForcesCodingPlatform, validateCodeChefCodingPlatform, validateLeetCodeCodingPlatform } = require('../Utils/validation.js');
const { getGfgData, getLeetcodeData, getCodeChefData, getCodeForcesData } = require('../Utils/codingPlatforms.js');
const { calculateStudentScore } = require('../Utils/score.js');
exports.addToLeaderboard = async (req, res) => {
    try {
      
        const [validationResultgfg, validationResultCodeForces, validateResultCodeChef, validateResultLeetcode] = await Promise.all([
            validategfgCodingPlatform(req),
            validateCodeForcesCodingPlatform(req),
            validateCodeChefCodingPlatform(req),
            validateLeetCodeCodingPlatform(req)
        ]);
        if (validationResultgfg && validationResultCodeForces && validateResultCodeChef && validateResultLeetcode) {
            const student = new Student(req.body);
            await student.save();
            res.status(200).json({
                message: "You are added successfully. Pleade wait 12 hours for the leaderboard to be updated",
                student: req.body
            });
        }
    } catch (err) {
        res.status(500).send("Internal Server Error: " + err.message);
    }
};

exports.updateLeaderboard = async (req, res) => {
  try {
    const students = await Student.find();

    const updateLeaderBoard = await Promise.all(
      students.map(async (student) => {
        const ObjectId = student._id;
        const firstName = student.firstName;
        const lastName = student.lastName;

        try {
          // Fetch all external platform data in parallel; ensure proper destructuring order.
          const [gfgData, leetData, ratingcc, ratingcf] = await Promise.all([
            getGfgData(student.gfgId),
            getLeetcodeData(student.leetcodeId),
            getCodeChefData(student.codechefId),
            getCodeForcesData(student.codeforcesId),
          ]);

          // Map raw fetched data into the numeric fields expected by the scoring system.
          const studentData = {
            problemsCountgfg: gfgData?.totalSolved || 0,
            problemsCountlc: leetData?.totalSolved || 0,
            ratinglc: leetData?.rating || 0,
            ratingcf: ratingcf || 0,
            ratingcc: ratingcc || 0,
            rank: 0,
          };

          const score = await calculateStudentScore(studentData);
          studentData.score = score;
          studentData.studentId = ObjectId;

          const result = await Leaderboard.updateOne(
            { studentId: ObjectId },
            { $set: studentData },
            { upsert: true }
          );

          console.log(
            result.upsertedCount > 0
              ? `Student ${ObjectId} added to leaderboard.`
              : `Student ${ObjectId} updated in leaderboard.`
          );

          return studentData;
        } catch (error) {
          console.error(`Error updating student ${firstName}  ${lastName}:`, error.message);
          return null;
        }
      })
    );

    const filteredStudents = updateLeaderBoard
      .filter(student => student !== null)
      .map(student => {
        const populatedStudent = students.find(s => s._id.equals(student.studentId));
        const firstName = populatedStudent?.firstName || '';
        const lastName = populatedStudent?.lastName || '';
        return {
          name: `${firstName} ${lastName}`,
          ratingcf: student.ratingcf,
          ratingcc: student.ratingcc,
          ratinglc: student.ratinglc,
          problemsCountgfg: student.problemsCountgfg,
          problemsCountlc: student.problemsCountlc,
          score: student.score
        };
      });

    res.status(200).json({
      message: 'Leaderboard updated successfully.',
      students: filteredStudents
    });
  } catch (err) {
    res.status(500).send('Internal Server Error: ' + err.message);
  }
};

exports.refreshLeaderboard = async(req,res)=>{
    try{
        const allStudents = await Leaderboard.find().sort({ score: -1 });
        const updadtedRanks = allStudents.map((student, index) => ({
            updateOne: {
                filter: {_id: student._id},
                update:{
                    $set: {
                        rank: index + 1,
                    },
                }
            }
        }));
            await Leaderboard.bulkWrite(updadtedRanks);
            res.status(200).send({
                message: "The leaderboard is Refreshed Succesfully",
            })  
    }catch(err){
        res.status(500).send({
            message: "Internal Server Error: " + err.message
        })
    }
};

exports.getLeaderboard = async(req,res) =>{
    try{

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 30;
        limit = Math.min(limit, 50);
        const skip = (page - 1) * limit;
        const leaderboardStudents = await Leaderboard.find().populate("studentId","firstName lastName").sort({ score: -1 }).skip(skip).limit(limit);
        
        if(leaderboardStudents){
            const result = leaderboardStudents.map(student => ({
                name: student.studentId.firstName + " " + student.studentId.lastName,
                rank: student.rank,
                score: student.score,
                leetcodeSolved: student.problemsCountlc,
                codeforcesRating: student.ratingcf,
                codechefRating: student.ratingcc,
                gfgSolved: student.problemsCountgfg,
            }));
            res.status(200).send(result);
        }
    }catch(err){
        res.status(500).send( "Internal Server Error: " + err.message);
    }
};