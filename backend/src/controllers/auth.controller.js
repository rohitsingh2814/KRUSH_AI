
const User = require("../models/User");
const { verifyGoogleToken } = require("../services/google.service");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");




const {
    sendPasswordResetEmail
} = require("../services/email.service");

const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required"
            });
        }

        const googleUser = await verifyGoogleToken(credential);

        let user = await User.findOne({
            email: googleUser.email
        });

        if (!user) {
            user = await User.create({
                name: googleUser.name,
                email: googleUser.email,
                googleId: googleUser.googleId,
                profileImage: googleUser.profileImage,
                authProvider: "google"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Google login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error(error);

        res.status(401).json({
            success: false,
            message: "Google authentication failed"
        });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        let user = await User.findOne({
            email: normalizedEmail
        }).select("+password");

        // User already exists
        if (user) {

            // Google account already exists
            if (user.googleId && !user.password) {
                return res.status(409).json({
                    success: false,
                    message:
                        "This email is already registered with Google. Please login with Google."
                });
            }

            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            authProvider: "local"
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (!user.password) {
            return res.status(401).json({
                success: false,
                message:
                    "This account uses Google login. Please login with Google."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const normalizedEmail = email
            .toLowerCase()
            .trim();

        const user = await User.findOne({
            email: normalizedEmail
        });

        // Don't reveal whether account exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists, a reset link has been sent."
            });
        }

        // Generate secure random token
        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Store only hashed token in MongoDB
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        // 15 minutes expiry
        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendPasswordResetEmail(
            user.email,
            resetUrl
        );

        return res.status(200).json({
            success: true,
            message:
                "If an account exists, a reset link has been sent."
        });

    } catch (error) {

    console.error("FORGOT PASSWORD ERROR:");
    console.error(error);


        console.error(
            "Forgot password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Check token
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required"
            });
        }

        // Check password
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "New password is required"
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Hash the token received from URL
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid token and non-expired token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset token is invalid or expired"
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            password,
            12
        );

        // Update password
        user.password = hashedPassword;

        // Delete reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // If Google account also exists
        if (user.googleId) {
            user.authProvider = "both";
        } else {
            user.authProvider = "local";
        }

        await user.save();

        // Generate new JWT
        const jwtToken = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to reset password"
        });
    }
};

module.exports = {
    googleLogin,login,register,forgotPassword,resetPassword
};