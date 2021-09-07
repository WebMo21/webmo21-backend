const express = require("express");
const router = express.Router();
const controller = require("./weekly-workout-plans-controller");
const { authorizeUser } = require("../../middleware/Authorization");

router.get("/", controller.getAllWeeklyWorkoutPlans);
router.get("/:id", controller.getWeeklyWorkoutPlanById);
router.get(
  "/userid/:user_id",
  authorizeUser,
  controller.getAllWeeklyWorkoutPlansByUserId
);
router.post("/", authorizeUser, controller.addWeeklyWorkoutPlan);
router.put("/", authorizeUser, controller.updateWeeklyWorkoutPlan);
router.delete("/:id", authorizeUser, controller.deleteWeeklyWorkoutPlan);

module.exports = router;
