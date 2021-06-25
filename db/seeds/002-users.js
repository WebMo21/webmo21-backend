exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          email: "first@seed.com",
          name: "First Seed",
        },
        {
          email: "second@seed.com",
          name: "Second Seed",
        },
        {
          email: "admin@seed.com",
          name: "Admin Seed",
        },
      ]);
    });
};
