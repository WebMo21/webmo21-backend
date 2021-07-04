const db = require("../../../db/db");
const bcrypt = require("bcryptjs");

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

const findByUsername = (username) =>
  db("users")
    .where("username", username)
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

const loginAsAdmin = (adminLoginDTO) =>
  new Promise((resolve, reject) => {
    findByUsername(adminLoginDTO.username)
      .then((user) => {
        if (user) {
          bcrypt.compare(
            adminLoginDTO.password,
            user.password,
            function (err, result) {
              if (result) {
                resolve({
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  role: user.role,
                  name: user.name,
                  created_at: user.created_at,
                  image: user.image,
                  gender: user.gender,
                });
              } else {
                reject(null);
              }
            }
          );
        } else {
          reject(null);
        }
      })
      .catch((error) => {
        console.log("Catch Error", error);
        reject(null);
      });
  });

const generateSaltedHash = (password) =>
  new Promise((resolve, reject) => {
    const saltRounds = 12;
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Salts and hashes
      bcrypt.compare(password, hash, function (err, result) {
        if (result) {
          resolve(hash);
        } else {
          reject();
        }
      });
    });
  });

module.exports = {
  find,
  findById,
  findByEmail,
  add,
  update,
  removeById,
  removeByEmail,
  loginAsAdmin,
  generateSaltedHash,
};
