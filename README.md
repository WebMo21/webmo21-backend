# Fitness Time Backend

## Working with Knex.JS Query Builder

### Creating new migration files

```bash
npx knex migrate:make init --migrations-directory db/migrations
```

### Running new unmigrated migrations

```bash
npx knex migrate:latest --knexfile db/knexfile.js
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
