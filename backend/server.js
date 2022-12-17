import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json());

app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).end(`ERROR 401`));

export default app;