const express = require("express");
const {
  getAllUsers,
  registerUser,
  login,
  refreshToken,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.get("/all-users", getAllUsers);
router.post("/register", registerUser);
router.post("/refresh-token", refreshToken);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
