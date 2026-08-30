const express = require("express");

const {
    googleLogin,
    register,
    login,
      forgotPassword,
      resetPassword

} = require("../controllers/auth.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/google", googleLogin);

router.post("/register", register);

router.post("/login", login);

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);

router.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            profileImage: req.user.profileImage
        }
    });
});

module.exports = router;