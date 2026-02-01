const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const companyRoutes = require("./routes/companyRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// ROUTES
app.use("/api/company", companyRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});