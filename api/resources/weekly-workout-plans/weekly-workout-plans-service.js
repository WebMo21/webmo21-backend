const db = require("../../../db/db");

function find() {
  return db("weekly_workout_plans");
}

const findById = (id) =>
  db("weekly_workout_plans")
    .where({ id })
    .first()
    .then((weeklyWorkoutPlan) =>
      weeklyWorkoutPlan ? weeklyWorkoutPlan : null
    );

const findWeeklyWorkoutPlansByUserId = (user_id) =>
  db("weekly_workout_plans as w")
    .join("users as u", "u.id", "w.user_id")
    .select(
      "w.id",
      "w.user_id",
      "w.name",
      "w.calendar_week",
      "w.year",
      "w.day_1",
      "w.day_2",
      "w.day_3",
      "w.day_4",
      "w.day_5",
      "w.day_6",
      "w.day_7"
    )
    .where("w.user_id", user_id);

const add = (weeklyWorkoutPlanDTO) =>
  db("weekly_workout_plans")
    .insert(
      {
        user_id: weeklyWorkoutPlanDTO.user_id,
        name: weeklyWorkoutPlanDTO.name,
        calendar_week: weeklyWorkoutPlanDTO.calendar_week,
        year: weeklyWorkoutPlanDTO.year,
        day_1: JSON.stringify(weeklyWorkoutPlanDTO.day_1),
        day_2: JSON.stringify(weeklyWorkoutPlanDTO.day_2),
        day_3: JSON.stringify(weeklyWorkoutPlanDTO.day_3),
        day_4: JSON.stringify(weeklyWorkoutPlanDTO.day_4),
        day_5: JSON.stringify(weeklyWorkoutPlanDTO.day_5),
        day_6: JSON.stringify(weeklyWorkoutPlanDTO.day_6),
        day_7: JSON.stringify(weeklyWorkoutPlanDTO.day_7),
      },
      "id"
    )
    .then(([id]) => findById(id));

const update = (id, changes) =>
  db("weekly_workout_plans").where({ id }).update(changes);

const remove = (id) => db("weekly_workout_plans").where("id", id).del();

module.exports = {
  find,
  findById,
  findWeeklyWorkoutPlansByUserId,
  add,
  update,
  remove,
};
