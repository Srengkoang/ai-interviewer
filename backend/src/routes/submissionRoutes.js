const express = require("express");
const router = express.Router();

const { submitCode } = require("../controllers/submissionController");

router.post("/execute", submitCode);

module.exports = router;