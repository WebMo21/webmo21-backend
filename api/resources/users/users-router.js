const express = require("express");
const router = express.Router();
const controller = require("./users-controller");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../../middleware/Authorization");

router.get("/", authorizeAdmin, controller.getAllUsers);
router.put("/signUp", controller.updateUser);
router.put("/", authorizeUser, controller.updateUser);
router.put("/admin", authorizeAdmin, controller.updateUser);
router.post("/admin-login", controller.loginAsAdmin);
router.post("/generate-salted-hash", controller.generateSaltedHash);

// Not used but already fully implemented for future use. Authorization Middleware not applied.
/* router.get("/id/:id", controller.getUserById); */
/* router.get("/email/:email", controller.getUserByEmail); */
/* router.post("/", controller.addUser); */
/* router.delete("/id/:id", controller.deleteUserById); */
/* router.delete("/email/:email", controller.deleteUserByEmail); */
module.exports = router;
