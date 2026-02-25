require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5006;

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("🔥 MongoDB Connected"))
.catch(err=> console.log("Mongo Error:", err));

app.get('/', (req,res)=>{
  res.send("🔥 SkillGo Smart Caller LIVE VPS Server Running...");
});

app.listen(PORT, ()=>{
  console.log(`🚀 Server running on ${PORT}`);
});
