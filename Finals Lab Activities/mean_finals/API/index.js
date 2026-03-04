// This file is saved inside the 'api' folder.

const express = require("express");
const { MongoClient } = require("mongodb");
const dns = require("dns");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING ="mongodb://localhost:27017";

const DATABASENAME = "MyDB";
let database;

// Middleware instantiation
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

console.log("Starting API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {
    // Create client with timeouts so you see errors quickly
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000, // 10s
      connectTimeoutMS: 10000,
    });

    await client.connect();

    database = client.db(DATABASENAME);
    console.log("Yay! Now connected to Cluster");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ROUTES TO ALL METHODS

// Get all books
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a book
app.post("/api/books/AddBook", async (req, res) => {
  try {
    // These keys (title, description, price) must match what Angular sends
    const { title, description, price } = req.body;

    const currentCount = await database.collection("Books").countDocuments();

    const newRecord = {
      id: String(currentCount + 1),
      title: title,
      desc: description, // Stored as 'desc' to match your 'GetBooks' logic
      price: Number(price) || 0
    };

    // This is the command that puts data into the screen you see in Compass
    await database.collection("Books").insertOne(newRecord);

    res.json("Inscription successful! Check Compass.");
  } catch (error) {
    console.error("Database Insert Failed:", error);
    res.status(500).json("The Archive is currently sealed.");
  }
});
// Delete book
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    await database.collection("Books").deleteOne({ id: req.query.id });
    res.json("Deleted successfully!");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});