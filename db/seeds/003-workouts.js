exports.seed = function (knex) {
  return knex("workouts")
    .del()
    .then(function () {
      return knex("workouts").insert([
        {
          user_id: "3",
          name: "Rowing",
          muscle_group: "Chest",
          duration_in_seconds: "1800",
        },
        {
          user_id: "1",
          name: "Dips",
          muscle_group: "Back",
          repetition_count: "20",
          equipment_weight_in_kilo: "80",
        },
      ]);
    });
};
