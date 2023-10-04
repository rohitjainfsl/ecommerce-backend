import express from "express";
import cors from "cors";
import connection, { dbName } from "./db/connection.js";
import AdminRouter from "./routes/AdminRouter.js";
import BaseRouter from "./routes/BaseRouter.js";
import path from "path";

const port = 8080;
export let db;
const app = express();

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/admin", AdminRouter);
app.use("/", BaseRouter);

connection
  .then((client) => {
    db = client.db(dbName);
    app.listen(port, () => console.log("Server started at port " + port));
  })
  .catch((err) => console.log("DB ERROR: " + err));
