const weeklyWorkoutPlansService = require("./weekly-workout-plans-service");

// TODO: VALIDATION NO MULTIPLE WORKOUTS DURING THE SAME SCHEDULED TIME ON THE SAME WEEK
// TODO: ON DELETE OF WORKOUT IT NEEDS TO BE DELETED FROM WORKOUTPLAN SCHEDULING TOO IF EXISTING

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

const getWeeklyWorkoutPlanById = (req, res) => {
  const { id } = req.params;

  if (id) {
    weeklyWorkoutPlansService
      .findById(id)
      .then((weeklyWorkoutPlan) => {
        weeklyWorkoutPlan
          ? res.status(200).json({
              weeklyWorkoutPlan,
            })
          : res.status(404).json({
              message:
                "Dieses wöchentliche Trainingsprogramm wurde nicht gefunden.",
            });
      })
      .catch((error) => {
        console.log(
          "Fehler beim Erhalten von diesem wöchentlichen Trainingsprogramm. ",
          error
        );
        return res.status(500).json({
          message:
            "Fehler beim Erhalten von diesem wöchentlichen Trainingsprogramm.",
        });
      });
  } else {
    return res.status(400).json({
      message:
        "Fehler beim Erhalten von diesem wöchentlichen Trainingsprogrammt, da Angaben fehlen.",
    });
  }
};

const getAllWeeklyWorkoutPlansByUserId = (req, res) => {
  const { user_id } = req.params;

  if (user_id) {
    weeklyWorkoutPlansService
      .findWeeklyWorkoutPlansByUserId(user_id)
      .then((weeklyWorkoutPlans) => {
        weeklyWorkoutPlans && weeklyWorkoutPlans.length
          ? res.status(200).json({
              weeklyWorkoutPlans,
            })
          : res.status(404).json({
              message:
                "Es konnten keine wöchentlichen Trainingsprogramme gefunden werden.",
            });
      })
      .catch((error) => {
        console.log(
          "Fehler beim Erhalten von wöchentlichen Trainingsprogrammen. ",
          error
        );
        return res.status(500).json({
          message:
            "Fehler beim Erhalten von wöchentlichen Trainingsprogrammen.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Erhalten von wöchentlichen Trainingsprogrammen.",
    });
  }
};

const addWeeklyWorkoutPlan = (req, res) => {
  const weeklyWorkoutPlanDTO = ({
    user_id,
    name,
    calendar_week,
    year,
    day_1,
    day_2,
    day_3,
    day_4,
    day_5,
    day_6,
    day_7,
  } = req.body);

  if (
    user_id &&
    name &&
    calendar_week &&
    year &&
    day_1 &&
    day_2 &&
    day_3 &&
    day_4 &&
    day_5 &&
    day_6 &&
    day_7
  ) {
    weeklyWorkoutPlansService
      .add(weeklyWorkoutPlanDTO)
      .then((newWeeklyWorkoutPlan) =>
        res.status(201).json({
          id: newWeeklyWorkoutPlan.id,
          userId: newWeeklyWorkoutPlan.user_id,
          name: newWeeklyWorkoutPlan.name,
          calendarWeek: newWeeklyWorkoutPlan.calendar_week,
          year: newWeeklyWorkoutPlan.year,
          day1: newWeeklyWorkoutPlan.day_1,
          day2: newWeeklyWorkoutPlan.day_2,
          day3: newWeeklyWorkoutPlan.day_3,
          day4: newWeeklyWorkoutPlan.day_4,
          day5: newWeeklyWorkoutPlan.day_5,
          day6: newWeeklyWorkoutPlan.day_6,
          day7: newWeeklyWorkoutPlan.day_7,
        })
      )
      .catch((error) => {
        console.log(
          "Fehler beim Hinzufügen von diesem wöchentlichen Trainingsprogramm. ",
          error
        );
        return res.status(500).json({
          message:
            "Fehler beim Hinzufügen von diesem wöchentlichen Trainingsprogramm.",
        });
      });
  } else {
    return res.status(400).json({
      message:
        "Fehler beim Hinzufügen von diesem wöchentlichen Trainingsprogramm, da Angaben fehlen.",
    });
  }
};

const updateWeeklyWorkoutPlan = (req, res) => {
  const updateWeeklyWorkoutPlanDTO = ({
    user_id,
    name,
    calendar_week,
    year,
    day_1,
    day_2,
    day_3,
    day_4,
    day_5,
    day_6,
    day_7,
  } = req.body);

  if (
    req.body.id &&
    (name ||
      calendar_week ||
      year ||
      day_1 ||
      day_2 ||
      day_3 ||
      day_4 ||
      day_5 ||
      day_6 ||
      day_7)
  ) {
    const weeklyWorkoutPlanWithJSONDays = {
      user_id: user_id,
      name: name,
      calendar_week: calendar_week,
      year: year,
    };
    day_1
      ? (weeklyWorkoutPlanWithJSONDays.day_1 = JSON.stringify(day_1))
      : JSON.stringify([]);
    day_2
      ? (weeklyWorkoutPlanWithJSONDays.day_2 = JSON.stringify(day_2))
      : JSON.stringify([]);
    day_3
      ? (weeklyWorkoutPlanWithJSONDays.day_3 = JSON.stringify(day_3))
      : JSON.stringify([]);
    day_4
      ? (weeklyWorkoutPlanWithJSONDays.day_4 = JSON.stringify(day_4))
      : JSON.stringify([]);
    day_5
      ? (weeklyWorkoutPlanWithJSONDays.day_5 = JSON.stringify(day_5))
      : JSON.stringify([]);
    day_6
      ? (weeklyWorkoutPlanWithJSONDays.day_6 = JSON.stringify(day_6))
      : JSON.stringify([]);
    day_7
      ? (weeklyWorkoutPlanWithJSONDays.day_7 = JSON.stringify(day_7))
      : JSON.stringify([]);

    weeklyWorkoutPlansService
      .update(req.body.id, weeklyWorkoutPlanWithJSONDays)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: "Das wöchentliche Trainingsprogramm wurde aktualisiert.",
            })
          : res.status(500).json({
              message:
                "Fehler bei der Aktualisierung des wöchentlichen Trainingsprogramms, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log(
          "Fehler bei der Aktualisierung des wöchentlichen Trainingsprogramms. ",
          error
        );
        return res.status(500).json({
          message:
            "Fehler bei der Aktualisierung des wöchentlichen Trainingsprogramms.",
        });
      });
  } else {
    return res.status(400).json({
      message:
        "Fehler bei der Aktualisierung des wöchentlichen Trainingsprogramms, da Angaben fehlen.",
    });
  }
};

const deleteWeeklyWorkoutPlan = (req, res) => {
  const { id } = req.params;

  if (id) {
    weeklyWorkoutPlansService
      .remove(id)
      .then(() =>
        res.status(200).json({
          message: "Das wöchentliche Trainingsprogramm wurde gelöscht.",
        })
      )
      .catch((error) => {
        console.log(
          "Fehler beim Löschen des wöchentlichen Trainingsprogramms. ",
          error
        );
        return res.status(500).json({
          message: "Fehler beim Löschen des wöchentlichen Trainingsprogramms.",
        });
      });
  } else {
    return res.status(400).json({
      message:
        "Fehler beim Löschen des wöchentlichen Trainingsprogramms, da Angaben fehlen.",
    });
  }
};

module.exports = {
  getAllWeeklyWorkoutPlans,
  getWeeklyWorkoutPlanById,
  getAllWeeklyWorkoutPlansByUserId,
  addWeeklyWorkoutPlan,
  updateWeeklyWorkoutPlan,
  deleteWeeklyWorkoutPlan,
};
