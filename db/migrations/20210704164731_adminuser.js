exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("username");
    table.string("password");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("username");
    table.dropColumn("password");
  });
};
