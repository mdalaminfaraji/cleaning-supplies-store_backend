const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("Cleaning-store");
    const collection = db.collection("users");
    const flashSaleProducts = db.collection("flashSaleProducts");

    // User Registration
    app.post("/api/v1/register", async (req, res) => {
      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      await collection.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    });

    // User Login
    app.post("/api/v1/login", async (req, res) => {
      const { email, password } = req.body;

      // Find user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });

      res.json({
        success: true,
        message: "Login successful",
        token,
      });
    });

    // ==============================================================
    // WRITE YOUR CODE HERE
    // ==============================================================

    // Flash Sale product api

    app.post("/api/v1/create-flash-sale-products", async (req, res) => {
      const bodyData = req.body;
      const body = { ...bodyData, createdAt: new Date() };
      const result = await flashSaleProducts.insertOne(body);
      res.status(201).json({
        success: true,
        message: "Product Created successfully",
        data: result,
      });
    });

    app.get("/api/v1/get-flash-sale-products", async (req, res) => {
      const result = await flashSaleProducts
        .find({ flashSale: true })
        .sort({ createdAt: -1 })
        .toArray();
      if (result) {
        res.status(201).json({
          success: true,
          message: "Product retrieved successfully",
          data: result,
        });
      } else {
        res.status(201).json({
          success: false,
          message: "Something Went Wrong",
        });
      }
    });
    app.get("/api/v1/get-flash-sale-products/:id", async (req, res) => {
      const { id } = req.params;
      const result = await flashSaleProducts.findOne({ _id: new ObjectId(id) });
      if (result) {
        res.status(201).json({
          success: true,
          message: "Product retrieved successfully",
          data: result,
        });
      } else {
        res.status(201).json({
          success: false,
          message: "Something Went Wrong",
        });
      }
    });

    // Trending Products
    app.get("/api/v1/get-trending-products", async (req, res) => {
      try {
        const trendingProducts = await flashSaleProducts
          .find({})
          .sort({ ratings: -1 })
          .toArray();
        if (trendingProducts) {
          res.status(200).json({
            success: true,
            message: "Trending products retrieved successfully",
            data: trendingProducts,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Trending products d'nt found",
            data: null,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });

    app.get("/api/v1/all-product", async (req, res) => {
      console.log(req.query);
      const { category } = req.query;
      let query = {};
      if (category == "undefined") {
        query = {};
      } else {
        query.category = category;
      }
      console.log(query);
      try {
        const allProducts = await flashSaleProducts.find(query).toArray();
        if (allProducts) {
          res.status(200).json({
            success: true,
            message: "all products retrieved successfully",
            data: allProducts,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "all products d'nt found",
            data: null,
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
