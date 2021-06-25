const db = require("../../../db/db");

const find = () => db("users");

const findById = (id) =>
  db("users")
    .where({ id })
    .first()
    .then((user) => (user ? user : null));

const findByEmail = (email) =>
  db("users")
    .where("email", email)
    .first()
    .then((user) => (user ? user : null));

const add = (user) =>
  db("users")
    .insert(user, "id")
    .then(([id]) => findById(id));

const update = (id, changes) => db("users").where({ id }).update(changes);

// Users will be set inactive instead of deleted for reasons of regulatory compliance
/* const remove = (id) => db("users").where("id", id).del(); */
const removeById = (id) =>
  db("users").where({ id }).update({ active: "false" });

const removeByEmail = (email) =>
  db("users").where({ email }).update({ active: "false" });

module.exports = {
  find,
  findById,
  findByEmail,
  add,
  update,
  removeById,
  removeByEmail,
};
