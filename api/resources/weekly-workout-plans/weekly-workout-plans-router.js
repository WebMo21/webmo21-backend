const express = require("express");
const router = express.Router();
const controller = require("./weekly-workout-plans-controller");
const { authorizeUser } = require("../../middleware/Authorization");

router.get(
  "/userid/:user_id",
  authorizeUser,
  controller.getAllWeeklyWorkoutPlansByUserId
);
router.post("/", authorizeUser, controller.addWeeklyWorkoutPlan);
router.put("/", authorizeUser, controller.updateWeeklyWorkoutPlan);
router.delete("/:id", authorizeUser, controller.deleteWeeklyWorkoutPlan);

// Not used but already fully implemented for future use. Authorization Middleware not applied.
/* router.get("/:id", controller.getWeeklyWorkoutPlanById); */
/* router.get("/", controller.getAllWeeklyWorkoutPlans); */

module.exports = router;
