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
