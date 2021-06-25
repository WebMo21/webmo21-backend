const usersService = require("./users-service");

const getAllUsers = (req, res) =>
  usersService
    .find()
    .then((users) =>
      res.status(200).json({
        users,
      })
    )
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Nutzern. ", error);
      return res.status(500).json({
        message: "Fehler beim Erhalten von allen Nutzern.",
      });
    });

module.exports = {
  getAllUsers,
};
