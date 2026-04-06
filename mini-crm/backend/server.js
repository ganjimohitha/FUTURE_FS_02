const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const User = require("./models/User");
const bcrypt = require("bcryptjs");

// DB connect
const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    if (!uri) {
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log("Using in-memory MongoDB");
    }
    await mongoose.connect(uri);
    console.log("MongoDB Connected");

    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log("Seeded default admin (admin@example.com / password123)");
    }
  } catch (err) {
    console.log(err);
  }
};
connectDB();

// test
app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));