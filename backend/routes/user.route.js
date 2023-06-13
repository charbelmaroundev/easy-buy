const express = require("express");
const router = express.Router();

const {
  signup,
  verification,
  login,
  getUser,
  updateUser,
  updatePassword,
  updateAddress,
  deleteAddress,
  logout,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post("/signup", signup);
router.post("/verification", verification);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update-user-info", isAuthenticated, updateUser);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-user-addresses", isAuthenticated, updateAddress);
router.delete("/delete-user-address/:id", isAuthenticated, deleteAddress);

module.exports = router;
