import express from "express";
import app from "./server.js";
import dotenv from "dotenv";
import mongodb from "mongodb";
import { exit } from "process";
import RestaurantsDAO from "./api/DAO/restaurantsDAO.js";
import ReviewsDAO from "./api/DAO/reviewsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(process.env.ATLAS_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.log(err);
    exit(1);
  })
  .then(async (client) => {
    await RestaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`MongoDB connection established on port ${port}.`);
    });
  });
