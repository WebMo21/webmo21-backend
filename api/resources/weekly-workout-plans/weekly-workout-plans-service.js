const db = require("../../../db/db");

function find() {
  return db("weekly_workout_plans");
}

module.exports = {
  find,
};
