import express from "express";
import { db } from "../index.js";
import multer from "multer";
import path from "path";

const AdminRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (req.url.match("/products")) callback(null, "uploads/products");
    else callback(null, "uploads/categories");
  },
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    const filename = req.body.name + ext;
    callback(null, filename);
  },
});
const upload = multer({ storage: storage });

AdminRouter.post("/products/add", upload.single("photo"), async (req, res) => {
  const { name, price, category, description } = req.body;
  const photo = req.file;
  db.collection("products")
    .insertOne({ name, price, category, description, photo })
    .then((result) => {
      res.status(201).send("Created");
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

AdminRouter.post("/category/add", upload.single("photo"), async (req, res) => {
  const { name } = req.body;
  const photo = req.file;
  db.collection("categories")
    .insertOne({ name, photo })
    .then((result) => {
      res.status(201).send("Created");
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

export default AdminRouter;
