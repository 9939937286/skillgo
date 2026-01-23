const app = require("./app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});