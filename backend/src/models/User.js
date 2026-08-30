const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        select: false, //Mongoose will NOT return the password field in normal queries.
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    profileImage: {
        type: String
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    }, preferences: {
        gender: String,
        ageRange: String,
        preferredColors: [String],
        favoriteEvents: [String],
        style: [String],

    },
    resetPasswordToken: {
        type: String,
        select: false
    },

    resetPasswordExpire: {
        type: Date,
        select: false
    },
    savedItems: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, {
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);