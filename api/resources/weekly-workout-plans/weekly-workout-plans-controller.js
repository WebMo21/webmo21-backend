const weeklyWorkoutPlansService = require("./weekly-workout-plans-service");

const getAllWeeklyWorkoutPlans = (req, res) =>
  weeklyWorkoutPlansService
    .find()
    .then((weeklyWorkoutPlans) =>
      res.status(200).json({
        weeklyWorkoutPlans,
      })
    )
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Trainingsplänen. ", error);
      return res.status(500).json({
        message: "Fehler beim Erhalten von allen Trainingsplänen.",
      });
    });

module.exports = {
  getAllWeeklyWorkoutPlans,
};
