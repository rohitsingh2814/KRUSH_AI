const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// Explicitly load backend/.env
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendPasswordResetEmail = async (email, resetUrl) => {

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset your Krush AI password",

        html: `
            <div style="font-family: Arial, sans-serif;">

                <h2>Krush AI - Reset Password</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Click the button below to reset your password:
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#000;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>

                <p>
                    This link expires in 15 minutes.
                </p>

                <p>
                    If you did not request this, you can ignore this email.
                </p>

                <p>
                    — Krush AI
                </p>

            </div>
        `
    });
};

module.exports = {
    sendPasswordResetEmail
};