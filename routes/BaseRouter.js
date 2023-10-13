import express from "express";
import { db } from "../index.js";
import bcrypt from "bcrypt";
// import md5 from "md5";

const BaseRouter = express.Router();

BaseRouter.get("/products", async (req, res) => {
  // Fetch all products from the 'products' collection
  const products = await db.collection("products").find({}).toArray();
  // Send the products as a JSON response
  res.json(products);
});

BaseRouter.get("/category", async (req, res) => {
  const categories = await db.collection("categories").find({}).toArray();
  res.json(categories);
});

BaseRouter.post("/register", async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const { name, email, username, password } = req.body;

  const userData = await db.collection("users").findOne({ username: username });

  if(userData){
    res.status(401).send("Username is taken")
  }

  const newuser = await db.collection("users").insertOne({
    name: name,
    email: email,
    username: username,
    password: password,
  });
  if (newuser) res.send("OK");
});

BaseRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const userData = await db.collection("users").findOne({ username: username });

  if (userData) {
    const match = await bcrypt.compare(password, userData.password);
    if(match) {

      res.send("OK")
    }
  }
});

export default BaseRouter;
