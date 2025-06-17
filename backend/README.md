# PTSC Backend

This is the backend for project for PTSC

## Changelog

### feat: Implement leaderboard functionality with student scoring and validation

> - Added leaderboard controller for adding, updating, refreshing, and retrieving leaderboard data.
> - Created models for Leaderboard and Student with necessary fields and validations.
> - Developed utility functions for fetching data from coding platforms (GFG, LeetCode, CodeChef, CodeForces).
> - Implemented score calculation logic based on various metrics.  
> - Added validation utilities for checking the existence of user profiles on coding platforms.
> - Configured MongoDB connection in a separate module.
> - Updated routes to include leaderboard operations.
> - Removed old database connection logic from db.js.
> - Updated package dependencies including axios and validator.