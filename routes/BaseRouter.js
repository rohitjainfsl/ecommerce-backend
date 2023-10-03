import express from "express";
import { db } from "../index.js";

const BaseRouter = express.Router();

BaseRouter.get("/products", async (req, res) => {
    // Fetch all products from the 'products' collection
    const products = await db.collection("products").find({}).toArray();  
    // Send the products as a JSON response
    res.json(products);
  });

export default BaseRouter;