const express = require("express");
const router = express.Router();
const controller = require("./workouts-controller");
const { authorizeUser } = require("../../middleware/Authorization");

router.get("/", authorizeUser, controller.getAllWorkouts);
router.get("/:id", authorizeUser, controller.getWorkoutById);
router.get(
  "/userid/:user_id",
  authorizeUser,
  controller.getAllWorkoutsByUserId
);
router.post("/", authorizeUser, controller.addWorkout);
router.put("/", authorizeUser, controller.updateWorkout);
router.delete("/:id", authorizeUser, controller.deleteWorkout);

module.exports = router;
