const express = require("express");
const router = express.Router();
const controller = require("./weekly-workout-plans-controller");

router.get("/", controller.getAllWeeklyWorkoutPlans);
router.get("/:id", controller.getWeeklyWorkoutPlanById);
router.get("/userid/:user_id", controller.getAllWeeklyWorkoutPlansByUserId);
router.post("/", controller.addWeeklyWorkoutPlan);
router.put("/", controller.updateWeeklyWorkoutPlan);
router.delete("/:id", controller.deleteWeeklyWorkoutPlan);

module.exports = router;
