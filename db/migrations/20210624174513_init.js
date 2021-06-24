exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email", 128).notNullable().unique();
      table.string("name", 128);
      table.timestamps(true, true);
    })
    .createTable("workouts", (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table.string("name", 50).notNullable();
      table.string("muscle_group", 255).notNullable();
      table.integer("repetition_count");
      table.integer("duration_in_seconds");
      table.integer("equipment_weight_in_kilo");
      table.timestamps(true, true);
    })
    .createTable("weekly_workout_plans", (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table.string("name", 50).notNullable();
      table.int("calendar_week").notNullable();
      table.int("year").notNullable();
      table.int("day_1");
      table.int("day_2");
      table.int("day_3");
      table.int("day_4");
      table.int("day_5");
      table.int("day_6");
      table.int("day_7");
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
