const knex = require("knext");
const knexfile = require("./knexfile");

const db = knex(knexfile.development);
module.export = db;
