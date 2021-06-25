const db = require("../../../db/db");

function find() {
  return db("users");
}

module.exports = {
  find,
};
