const workoutsService = require("./workouts-service");

const getAllWorkouts = (req, res) =>
  workoutsService
    .find()
    .then((workouts) =>
      res.status(200).json({
        workouts,
      })
    )
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Übungen. ", error);
      return res.status(500).json({
        message: "Fehler beim Erhalten von allen Übungen.",
      });
    });

module.exports = {
  getAllWorkouts,
};
