const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   Worker Register
========================= */
exports.registerWorker = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Worker.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Worker already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await Worker.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "worker",
    });

    res.status(201).json({
      message: "Worker registered successfully",
      worker,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* =========================
   Worker Login
========================= */
exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};