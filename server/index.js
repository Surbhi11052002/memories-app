import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes); //(this will make sure every route in postRoutes start with /posts)

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

//cluster created on mongoDB
//username,password
const CONNECTION_URL =
  "mongodb+srv://surbhi_prasad:w5U7KPYNnDTJAf2M@cluster0.pfxv2ia.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

//we are using mongoose to connect to our database
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  //if our connection is successfull
  .catch((error) => console.log(error.message));
//if our connection has error
