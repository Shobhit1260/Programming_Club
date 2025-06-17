const express = require('express');
const router = express.Router();
const { addToLeaderboard, refreshLeaderboard ,getLeaderboard } = require('../Controllers/leaderboard');
const { updateLeaderboard } = require('../Controllers/leaderboard')
const { isAuthenticated } = require('../Middlewares/isAuthenticated');
const { authorizeRoles } = require('../Middlewares/isAuthorization');

router.post('/leaderboard/add', addToLeaderboard);
router.post('/leaderboard/update', isAuthenticated , authorizeRoles('admin' ,'member'),updateLeaderboard);
router.post('/leaderboard/refresh', isAuthenticated , authorizeRoles('admin' ,'member'), refreshLeaderboard)
router.get('/leaderboard', getLeaderboard);

module.exports = router;


