const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    res.send({
        email,
        password,
    });
});

module.exports = {
    authUser,
};
