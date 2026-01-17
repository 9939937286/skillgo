const app = require("./src/app");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`SkillGo Backend running on port ${PORT}`);
});