const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/auth.middleware");

const upload =
    require("../middleware/upload.middleware");

const {
    analyzeOutfit
} = require("../controllers/analysis.controller");


router.post(
    "/analyze",
    protect,
    upload.single("photo"),
    analyzeOutfit
);


module.exports = router;