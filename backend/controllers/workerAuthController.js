const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Worker Register
 */
exports.registerWorker = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingWorker = await Worker.findOne({ email });
    if (existingWorker) {
      return res.status(400).json({
        success: false,
        message: "Worker already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await Worker.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Worker registered successfully",
      worker,
    });
  } catch (error) {
    console.error("Worker Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Worker Login
 */
exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // ✅ FIXED
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      worker: {
        id: worker._id,
        name: worker.name,
        email: worker.email,
      },
    });
  } catch (error) {
    console.error("Worker Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};