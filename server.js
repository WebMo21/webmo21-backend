const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("morgan");
const server = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://fitness-time.vercel.app/",
  "https://www.fitness-time.app/",
  "https://www.fitness-time.app",
  "https://fitness-time.app/",
  "https://fitness-time.app",
  "http://localhost:3000/auth/adminlogin",
  "https://fitness-time.vercel.app/auth/adminlogin",
  "https://www.fitness-time.app/auth/adminlogin",
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

const webmoSender = '"Sascha Majewsky" <s.majewsky93@gmail.com>';
const webmoTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(logger("dev"));
server.disable("etag");

server.get("/", function rootHandler(req, res) {
  res.status(200).json({
    message: `Welcome to the ${process.env.DEPLOYMENT} environment API of fitness time!`,
  });
});

server.post("/email", function rootHandler(req, res) {
  const { name, email, message } = req.body;

  if (email && name && message) {
    webmoTransporter.sendMail({
      from: webmoSender,
      to: email,
      bcc: webmoSender,
      subject: "Fitness Time Email",
      text: "We have received your message " + message,
      html: "<h3>We have received your message</h3><br>" + message,
    });
    res.status(200).json({
      message: `EMAIL SENT!`,
    });
  } else {
    res.status(400).json({
      message: `Please fill out all fields!`,
    });
  }
});

const UsersRouter = require("./api/resources/users/users-router");
const WorkoutsRouter = require("./api/resources/workouts/workouts-router");
const WeeklyWorkoutsPlansRouter = require("./api/resources/weekly-workout-plans/weekly-workout-plans-router");

server.use("/v1/users", UsersRouter);
server.use("/v1/workouts", WorkoutsRouter);
server.use("/v1/weekly-workout-plans", WeeklyWorkoutsPlansRouter);

module.exports = server;
