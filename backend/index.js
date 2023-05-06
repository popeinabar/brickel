require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user");
const loginRoute = require("./routes/userRoute");
const cors = require("cors");

//express app
const app = express();

//mongoose
const mongoose = require("mongoose");

app.use(cors());
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/person", loginRoute);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connnected to db and Server is listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
