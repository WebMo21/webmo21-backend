const express = require("express");
const router = express.Router();
const controller = require("./workouts-controller");

router.get("/", controller.getAllWorkouts);

module.exports = router;
