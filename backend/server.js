// server.js (FINAL)

const app = require("./src/app");

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`SkillGo Backend running on port ${PORT}`);
});