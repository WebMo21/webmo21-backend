const express = require("express");
const router = express.Router();
const controller = require("./users-controller");

router.get("/", controller.getAllUsers);
router.get("/id/:id", controller.getUserById);
router.get("/email/:email", controller.getUserByEmail);
router.post("/", controller.addUser);
router.put("/", controller.updateUser);
router.delete("/id/:id", controller.deleteUserById);
router.delete("/email/:email", controller.deleteUserByEmail);
router.post("/admin-login", controller.loginAsAdmin);
router.post("/generate-salted-hash", controller.generateSaltedHash);

module.exports = router;
