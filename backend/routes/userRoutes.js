const express = require("express");
const {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router.route("/").post(registerUser);
router.route("/").get(protect, admin, getUsers);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;
