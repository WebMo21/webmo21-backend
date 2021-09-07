const db = require("../resources/users/users-service");

const isUser = (userId) =>
  db.findById(userId).then((user) => {
    console.log("USER", user);
    if (user) {
      console.log("CONTINUE");
      if (user.role === "user" || user.role === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("FALSE ABORT");
      return false;
    }
  });

const authorizeUser = (req, res, next) => {
  if (
    req.headers.authorization &&
    Number.isInteger(parseInt(req.headers.authorization))
  ) {
    isUser(req.headers.authorization).then((isUser) => {
      if (isUser) {
        console.log("NEXT", isUser);
        next();
      } else {
        console.log("NO AUTH", isUser);
        res.status(401).json({ message: "Autorisierung User fehlgeschlagen." });
      }
    });
  } else {
    console.log("DIDNT MATCH");
    res.status(401).json({ message: "Autorisierung User fehlgeschlagen." });
  }
};

const isAdmin = (userId) =>
  db.findById(userId).then((user) => {
    if (user) {
      if (user.role === "admin") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

const authorizeAdmin = (req, res, next) => {
  if (
    req.headers.authorization &&
    Number.isInteger(parseInt(req.headers.authorization))
  ) {
    isAdmin(req.headers.authorization).then((isAdmin) => {
      if (isAdmin) {
        console.log("NEXT ADMIN", isAdmin);
        next();
      } else {
        console.log("NO AUTH ADMIN", isAdmin);
        res
          .status(401)
          .json({ message: "Autorisierung Admin fehlgeschlagen." });
      }
    });
  } else {
    console.log("DIDNT MATCH ADMIN");
    res.status(401).json({ message: "Autorisierung Admin fehlgeschlagen." });
  }
};

module.exports = {
  authorizeUser,
  authorizeAdmin,
};
