const express = require("express");
const router = express.Router();
const controller = require("./weekly-workout-plans-controller");

router.get("/", controller.getAllWeeklyWorkoutPlans);

module.exports = router;
