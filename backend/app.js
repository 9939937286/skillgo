const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json()); // body parser

/* =========================
   ROUTES IMPORT
========================= */
const companyJobsRoutes = require("./routes/companyJobsRoutes");
const userRoutes = require("./routes/userRoutes"); // agar hai to

/* =========================
   BASE ROUTE (Health Check)
========================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillGo backend running successfully 🚀"
  });
});

/* =========================
   API ROUTES
========================= */
app.use("/api/company/jobs", companyJobsRoutes);
app.use("/api/users", userRoutes); // optional

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found ❌"
  });
});

/* =========================
   SERVER START
========================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ SkillGo server running on port ${PORT}`);
});