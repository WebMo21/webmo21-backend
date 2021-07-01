const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const server = express();
require("dotenv").config();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://fitness-time.vercel.app/",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(console.log("Not allowed by CORS", origin));
    }
  },
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(logger("dev"));
server.disable("etag");

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
