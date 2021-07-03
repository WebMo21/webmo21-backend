// Added missing tables/columns from https://next-auth.js.org/adapters/typeorm/postgres

exports.up = function (knex) {
  return knex.schema
    .createTable("accounts", (table) => {
      table.increments("id");
      table.string("compound_id", 255).notNullable().unique();
      table.integer("user_id").notNullable();
      table.string("provider_type", 255).notNullable();
      table.string("provider_id", 255).notNullable();
      table.string("provider_account_id", 255).notNullable();
      table.text("refresh_token");
      table.text("access_token");
      table.timestamp("access_token_expires", { useTz: true });
      table.timestamps(true, true);
      table.index("user_id", "user_id");
      table.index("provider_account_id", "provider_account_id");
      table.index("provider_id", "provider_id");
    })
    .createTable("sessions", (table) => {
      table.increments("id");
      table.integer("user_id").notNullable();
      table.timestamp("expires", { useTz: true }).notNullable();
      table.string("session_token", 255).notNullable().unique();
      table.string("access_token", 255).notNullable().unique();
      table.timestamps(true, true);
    })
    .createTable("verification_requests", (table) => {
      table.increments("id");
      table.string("identifier", 255).notNullable();
      table.string("token", 255).notNullable().unique();
      table.timestamp("expires", { useTz: true }).notNullable();
      table.timestamps(true, true);
    })
    .alterTable("users", (table) => {
      table.timestamp("email_verified", { useTz: true });
      table.text("image");
      table.string("email", 255).nullable().alter();
      table.string("name", 255).alter();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("accounts")
    .dropTable("sessions")
    .dropTable("verification_requests")
    .alterTable("users", (table) => {
      table.dropColumn("email_verified");
      table.dropColumn("image");
      table.text("image");
      table.string("email", 128).notNullable().alter();
      table.string("name", 128).alter();
    });
};
