const usersService = require("./users-service");

const getAllUsers = (req, res) =>
  usersService
    .find()
    .then((users) =>
      res.status(200).json(
        users.map((user) => ({
          active: user.active,
          created_at: user.created_at,
          email: user.email,
          email_verified: user.email_verified,
          gender: user.gender,
          id: user.id,
          image: user.image,
          name: user.name,
          role: user.role,
          username: user.username,
        }))
      )
    )
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Nutzern. ", error);
      return res.status(500).json({
        message: "Fehler beim Erhalten von allen Nutzern.",
      });
    });

const getUserById = (req, res) => {
  const { id } = req.params;

  if (id) {
    usersService
      .findById(id)
      .then((user) => {
        user
          ? res.status(200).json({
              user,
            })
          : res.status(404).json({
              message: "Dieser Nutzer wurde nicht gefunden.",
            });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Nutzer. ", error);
        return res.status(500).json({
          message: "Fehler beim Erhalten von diesem Nutzer.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const getUserByEmail = (req, res) => {
  const { email } = req.params;

  if (email) {
    usersService
      .findByEmail(email)
      .then((user) => {
        user
          ? res.status(200).json({
              user,
            })
          : res.status(404).json({
              message: "Dieser Nutzer wurde nicht gefunden.",
            });
      })
      .catch((error) => {
        console.log("Fehler beim Erhalten von diesem Nutzer. ", error);
        return res.status(500).json({
          message: "Fehler beim Erhalten von diesem Nutzer.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Erhalten von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const addUser = (req, res) => {
  const userDTO = ({ name, email } = req.body);
  {
    console.log("I AM ADDING A USER", req.body);
  }

  if (email) {
    usersService
      .add(userDTO)
      .then((newUser) =>
        res.status(201).json({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          active: newUser.active,
          role: newUser.role,
        })
      )
      .catch((error) => {
        console.log("Fehler beim Hinzufügen von diesem Nutzer. ", error);
        return res.status(500).json({
          message: "Fehler beim Hinzufügen von diesem Nutzer.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Hinzufügen von diesem Nutzer, da Angaben fehlen.",
    });
  }
};

const updateUser = (req, res) => {
  const updateUserDTO = ({ name, email, active, gender, role } = req.body);
  console.log("I AM UPDATING A USER", req.body);

  if (req.body.id && (name || email || gender || active.toString())) {
    usersService
      .update(req.body.id, updateUserDTO)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: "Die Nutzerinformationen wurden aktualisiert.",
            })
          : res.status(500).json({
              message:
                "Fehler bei der Aktualisierung der Nutzerinformationen, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log(
          "Fehler bei der Aktualisierung der Nutzerinformationen. ",
          error
        );
        return res.status(500).json({
          message: "Fehler bei der Aktualisierung der Nutzerinformationen.",
        });
      });
  } else {
    return res.status(400).json({
      message:
        "Fehler bei der Aktualisierung der Nutzerinformationen, da Angaben fehlen.",
    });
  }
};

const deleteUserById = (req, res) => {
  const { id } = req.params;

  if (id) {
    usersService
      .removeById(id)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: "Der Nutzer wurde als inaktiv vermerkt.",
            })
          : res.status(500).json({
              message:
                "Der Nutzer konnte nicht gelöscht werden, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Nutzers. ", error);
        return res.status(500).json({
          message: "Fehler beim Löschen des Nutzers.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Löschen des Nutzers, da Angaben fehlen.",
    });
  }
};

const deleteUserByEmail = (req, res) => {
  const { email } = req.params;

  if (email) {
    usersService
      .removeByEmail(email)
      .then((successFlag) =>
        successFlag > 0
          ? res.status(200).json({
              message: "Der Nutzer wurde als inaktiv vermerkt.",
            })
          : res.status(500).json({
              message:
                "Der Nutzer konnte nicht gelöscht werden, da Fehler in der Datenbank auftraten.",
            })
      )
      .catch((error) => {
        console.log("Fehler beim Löschen des Nutzers. ", error);
        return res.status(500).json({
          message: "Fehler beim Löschen des Nutzers.",
        });
      });
  } else {
    return res.status(400).json({
      message: "Fehler beim Löschen des Nutzers, da Angaben fehlen.",
    });
  }
};

// Compliant with https://next-auth.js.org/providers/credentials#example
const loginAsAdmin = (req, res) => {
  const adminLoginDTO = ({ username, password } = req.body);

  if (username && password) {
    usersService
      .loginAsAdmin(adminLoginDTO)
      .then((user) => res.status(200).json({ user: user }))
      .catch((error) => {
        console.log("Fehler beim Einloggen des Admins. ", error);
        return res.status(500).json({ user: "" });
      });
  } else {
    return res.status(400).json({ user: "" });
  }
};

// Utility function for admins
const generateSaltedHash = (req, res) => {
  const { password } = req.body;

  if (password) {
    usersService
      .generateSaltedHash(password)
      .then((saltedHash) => {
        console.log("RETURN", saltedHash);
        saltedHash
          ? res.status(200).json(saltedHash)
          : res
              .status(401)
              .json({ message: "Benutzername oder Passwort nicht gültig." });
      })
      .catch((error) => {
        console.log("Fehler beim Erstellen des Salted Hash. ", error);
        return res
          .status(500)
          .json({ message: "Fehler beim Erstellen des Salted Hash" });
      });
  } else {
    return res.status(400).json({ message: "No password was provided" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUserById,
  deleteUserByEmail,
  loginAsAdmin,
  generateSaltedHash,
};
