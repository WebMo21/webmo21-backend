# Fitness Time Backend

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
  "day_1": {
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
  },
  "day_2": {
    { "workout_id": "13",
      "workout_completed": "no",
      "workout_tracked_time": "0",
      "workout_time_start": "11:00",
      "workout_time_end": "12:00"
    },
  },
  "day_3": {},
  "day_4": {},
  "day_5": {},
  "day_6": {},
  "day_7": {}
```

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
