const Worker = require("../models/Worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerWorker = async (req, res) => {
  try {
    const { name, email, mobile, password, skills, location } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    const exists = await Worker.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Worker already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const worker = await Worker.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      skills,
      location
    });

    return res.status(201).json({
      success: true,
      message: "Worker registered successfully",
      worker
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// LOGIN
exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await Worker.findOne({ email });
    if (!worker) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: worker._id, role: "worker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};