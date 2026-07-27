const express = require("express");
const cors = require("cors");

const app = express();

const aiRoutes = require("./routes/aiRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/submissions", submissionRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

module.exports = app;