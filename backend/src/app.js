const express = require("express");
const path =require("path");
const fs =require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const analysisRoutes =
    require("./routes/analysis.routes");
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


const root = path.resolve();

const frontendPath = path.join(process.cwd(), "..", "frontend", "dist");
console.log(process.cwd());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use(
    "/api/analysis",
    analysisRoutes
);



app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "krush AI Backend is running ✈️"
    })
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(frontendPath));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}




module.exports = app;