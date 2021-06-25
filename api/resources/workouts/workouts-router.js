const express = require("express");
const router = express.Router();
const controller = require("./workouts-controller");

router.get("/", controller.getAllWorkouts);
router.get("/:id", controller.getWorkoutById);
router.get("/userid/:user_id", controller.getAllWorkoutsByUserId);
router.post("/", controller.addWorkout);
router.put("/", controller.updateWorkout);
router.delete("/id/:id", controller.deleteWorkout);

module.exports = router;
