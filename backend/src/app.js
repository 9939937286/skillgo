const express = require("express");
const app = express();

app.use(express.json()); // ⭐ बहुत जरूरी

const userRoutes = require("./routes/users");

// ⭐ यही line सबसे important है
app.use("/api/users", userRoutes);

const PORT = 5006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});