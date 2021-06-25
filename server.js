const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const server = express();
require("dotenv").config();

server.use(helmet());
server.use(express.json());
server.use(logger("dev"));

server.get("/", function rootHandler(req, res) {
  res.send(
    `Welcome to the ${process.env.DEPLOYMENT} environment API of fitness time!`
  );
});

const UsersRouter = require("./api/resources/users/users-router");
const WorkoutsRouter = require("./api/resources/workouts/workouts-router");
const WeeklyWorkoutsPlansRouter = require("./api/resources/weekly-workout-plans/weekly-workout-plans-router");

server.use("/v1/users", UsersRouter);
server.use("/v1/workouts", WorkoutsRouter);
server.use("/v1/weekly-workout-plans", WeeklyWorkoutsPlansRouter);

module.exports = server;
