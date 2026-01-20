const express = require("express");
const app = express();

app.use(express.json());

// ===============================
// TEMP DATABASE (Memory)
// ===============================
let users = [];

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("SkillGo Backend Running");
});

// ===============================
// CREATE USER (POST)
// ===============================
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email required",
    });
  }

  const newUser = {
    id: Date.now(), // unique number ID
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created",
    data: newUser,
  });
});

// ===============================
// GET ALL USERS
// ===============================
app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    total: users.length,
    data: users,
  });
});

// ===============================
// UPDATE USER (PUT)
// ===============================
app.put("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;

  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  users[index] = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email,
  };

  res.json({
    success: true,
    message: "User updated",
    data: users[index],
  });
});

// ===============================
// DELETE USER (DELETE)
// ===============================
app.delete("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  users = users.filter((u) => u.id !== userId);

  res.json({
    success: true,
    message: "User deleted",
    data: user,
  });
});

// ===============================
// SERVER START
// ===============================
const PORT = 5006;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});