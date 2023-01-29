
const express = require("express");
const { createUser, loginUser, getUsers, getUser, deleteUser, updateUser } = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", authMiddleware, isAdmin, getUsers);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.put("/:id", authMiddleware, isAdmin, updateUser);

module.exports = router;