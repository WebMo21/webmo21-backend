const db = require("../../../db/db");

function find() {
  return db("workouts");
}

const findById = (id) =>
  db("workouts")
    .where({ id })
    .first()
    .then((workout) => (workout ? workout : null));

const findWorkoutsByUserId = (user_id) =>
  db("workouts as w")
    .join("users as u", "u.id", "w.user_id")
    .select(
      "w.id",
      "w.user_id",
      "w.name",
      "w.muscle_group",
      "w.repetition_count",
      "w.duration_in_seconds",
      "w.equipment_weight_in_kilo"
    )
    .where("w.user_id", user_id);

const add = (workout) =>
  db("workouts")
    .insert(workout, "id")
    .then(([id]) => findById(id));

const update = (id, changes) => db("workouts").where({ id }).update(changes);

const remove = (id) => db("workouts").where("id", id).del();

module.exports = {
  find,
  findById,
  findWorkoutsByUserId,
  add,
  update,
  remove,
};
