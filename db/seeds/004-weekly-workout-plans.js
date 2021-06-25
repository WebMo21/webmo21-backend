exports.seed = function (knex) {
  return knex("weekly_workout_plans")
    .del()
    .then(function () {
      return knex("weekly_workout_plans").insert([
        {
          user_id: "1",
          name: "Vergangenen Montag",
          calendar_week: "24",
          year: "2021",
          day_1: JSON.stringify([
            {
              workout_id: "1",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "13:00",
              workout_time_end: "13:30",
            },
            {
              workout_id: "3",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "13:30",
              workout_time_end: "13:45",
            },
          ]),
          day_2: JSON.stringify([
            {
              workout_id: "2",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "11:00",
              workout_time_end: "12:00",
            },
          ]),
          day_3: JSON.stringify([]),
          day_4: JSON.stringify([]),
          day_5: JSON.stringify([]),
          day_6: JSON.stringify([]),
          day_7: JSON.stringify([]),
        },
        {
          user_id: "3",
          name: "Zukünftiger Freitag",
          calendar_week: "50",
          year: "2022",
          day_1: JSON.stringify([]),
          day_2: JSON.stringify([]),
          day_3: JSON.stringify([]),
          day_4: JSON.stringify([]),
          day_5: JSON.stringify([
            {
              workout_id: "4",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "19:00",
              workout_time_end: "20:00",
            },
            {
              workout_id: "1",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "20:00",
              workout_time_end: "20:15",
            },
            {
              workout_id: "2",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "20:15",
              workout_time_end: "20:30",
            },
          ]),
          day_6: JSON.stringify([
            {
              workout_id: "3",
              workout_completed: "no",
              workout_tracked_time: "0",
              workout_time_start: "08:00",
              workout_time_end: "09:00",
            },
          ]),
          day_7: JSON.stringify([]),
        },
      ]);
    });
};
