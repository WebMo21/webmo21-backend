const db = require("../../../db/db");

function find() {
  return db("workouts");
}

module.exports = {
  find,
};
