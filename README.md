# 🏋️ Fitness Time - Workout Planner Backend

A lightweight backend enabling users scheduling and organization of fitness activities.

![Alt Text](./assets/img/backend-code-and-route-preview.gif)

## ✨ Features

- Provides running Node.js Backend with REST API
- Connection to Heroku database working and Fixed SSL error
- File structure following principles of clean code has been implemented in good faith
- Database migration files and example seeding data
- Implemented full CRUD support for the 3 resources users, workouts and weekly-workout-plans with router, controller and service layer abstraction
- REST API has API tests persisted within within the thunder-tests folder for documentation and execution
- Provided structured documentation for the project

## 🤖 Technologies

- [Express.js](https://expressjs.com) node backend server running providing a fast & minimalist REST API

- [Knex.js](http://knexjs.org) query builder used to handle migrations, seeding and connection to database
- [PostgreSQL](https://www.postgresql.org) relational database connected with the help of free hosting on [Heroku](https://heroku.com)
- Continuous Integration / Continuous Deployment Pipeline achieved with [Heroku](https://heroku.com)
- [Thunder Client](https://www.thunderclient.io) as an alternative to Postman for version controlled and easy documented REST API tests

## Development & Ideas

### Database Architecture

![Alt Text](./assets/img/db_architecture_v2.png)

**users** <br>
Since the authentication process is handled through Next-Auth.js with magic links for social media login and email magic links there is not a lot of data gathered from the users, only email and if social media is used also the name. On top of that active declares if a user is logically deleted since real deletion would not be compliant with regulatory rules and is_admin signals the authorization of a given user.

**workouts** <br>
Users should be able to create custom workouts but also can select already created example workouts for themself. Only workout attributes and a foreign key to the user owning them is stored.

**weekly_workout_plans** <br>
During the design architecture some discussion about granularity came up but consensus was that each workoutplan is consisting of 7 possible workout days, a name, a year and which calender week it represents. In the backend users can be searched for all of their weekly_workout_plans and them sent to the frontend to be displayed in a calender view accordingly to their week. For each day there will be a json containing information about the individual workouts like tracking their completing, the real invested time, the scheduled time each of them should happen for the day and the id of the workout similar to this example:

```json
  "day_1": [
    { "workout_id": "17",
      "workout_completed": "no",
      "workout_tracked_time": "0",
      "workout_time_start": "13:00",
      "workout_time_end": "13:30"
    },
    { "workout_id": "24",
      "workout_completed": "no",
      "workout_tracked_time": "0",
      "workout_time_start": "13:30",
      "workout_time_end": "13:45"
    }
  ],
  "day_2": [
    { "workout_id": "13",
      "workout_completed": "no",
      "workout_tracked_time": "0",
      "workout_time_start": "11:00",
      "workout_time_end": "12:00"
    },
  ],
  "day_3": [],
  "day_4": [],
  "day_5": [],
  "day_6": [],
  "day_7": []
```

## Performance

## Working with Knex.JS Query Builder

### Creating new migration files

```bash
npx knex migrate:make init --migrations-directory db/migrations
```

### Running new unmigrated migrations

```bash
npx knex migrate:latest --knexfile db/knexfile.js
```

### Running Seed Files

```bash
npx knex seed:run --knexfile db/knexfile.js
```

## Fixing SSL problems with Knex and Heroku PostgreSQL database

Configure the heroku app with the config var/environment variable:

```bash
PGSSLMODE=no-verify
```

````javascript
// in your knexfile.js
// Should come with install of pg
const parse = require("pg-connection-string").parse;
// Parse the environment variable into an object
const pgconfig = parse(process.env.DATABASE_URL);
// Add SSL setting to default environment variable
pgconfig.ssl = { rejectUnauthorized: false };
const db = knex({
  client: "pg",
  connection: pgconfig,
});```
````
