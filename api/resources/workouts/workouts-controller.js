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

const getWorkoutById = (req, res) => {
  const { id } = req.params;

  if (id) {
    workoutsService
      .findById(id)
      .then((workout) => {
        workout
          ? res.status(200).json({
              workout,
            })
          : res.status(404).json({
              message: "Dieses Workout wurde nicht gefunden.",
            });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Workout. ", error);
        return res.status(500).json({
          message: "Fehler beim Erhalten von diesem Workout.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Erhalten von diesem Workout, da Angaben fehlen.",
    });
  }
};

const getAllWorkoutsByUserId = async (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    workoutsService
      .findWorkoutsByUserId(user_id)
      .then((workouts) => {
        workouts && workouts.length
          ? res.status(200).json({
              workouts,
            })
          : res.status(404).json({
              message: "Es konnten keine Workouts gefunden werden.",
            });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von Workouts. ", error);
        return res.status(500).json({
          message: "Fehler beim Erhalten vvon Workouts.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Erhalten von Workouts, da Angaben fehlen.",
    });
  }
};

const addWorkout = (req, res) => {
  const workoutDTO = ({
    user_id,
    name,
    muscle_group,
    repetition_count,
    duration_in_seconds,
    equipment_weight_in_kilo,
  } = req.body);

  if (
    user_id &&
    name &&
    muscle_group &&
    (repetition_count || duration_in_seconds)
  ) {
    workoutsService
      .add(workoutDTO)
      .then((newWorkout) =>
        res.status(201).json({
          id: newWorkout.id,
          userId: newWorkout.user_id,
          name: newWorkout.name,
          muscleGroup: newWorkout.muscle_group,
          repetitionCount: newWorkout.repetition_count,
          durationInSeconds: newWorkout.duration_in_seconds,
          EquipmentWeightInKilo: newWorkout.equipment_weight_in_kilo,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Workout. ", error);
        return res.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Workout.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Hinzufügen von diesem Workout, da Angaben fehlen.",
    });
  }
};

const updateWorkout = (req, res) => {
  const updateWorkoutDTO = ({
    user_id,
    name,
    muscle_group,
    repetition_count,
    duration_in_seconds,
    equipment_weight_in_kilo,
  } = req.body);

  if (
    req.body.id &&
    (user_id ||
      name ||
      muscle_group ||
      repetition_count ||
      duration_in_seconds ||
      equipment_weight_in_kilo)
  ) {
    workoutsService
      .update(req.body.id, updateWorkoutDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: "Die Workoutinformationen wurden aktualisiert.",
            })
          : res.status(500).json({
              message:
                "Fehler bei der Aktualisierung des Workouts, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler bei der Aktualisierung des Workouts. ", error);
        return res.status(500).json({
          message: "Fehler bei der Aktualisierung des Workouts.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler bei der Aktualisierung des Workouts, da Angaben fehlen.",
    });
  }
};

const deleteWorkout = (req, res) => {
  const { id } = req.params;

  if (id) {
    workoutsService
      .remove(id)
      .then(() =>
        res.status(200).json({
          message: "Das Workout wurde gelöscht.",
        })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Workouts. ", error);
        return res.status(500).json({
          message: "Fehler beim Löschen des Workouts.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Löschen des Workouts, da Angaben fehlen.",
    });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  getAllWorkoutsByUserId,
  addWorkout,
  updateWorkout,
  deleteWorkout,
};
