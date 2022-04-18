const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const usersRoutes = require("./Routes/User-routes");
const quizRoutes = require("./Routes/Quiz-routes");
const quoteRoutes = require("./Routes/Quotes-routes");
const productRoutes = require("./Routes/Product-routes");
const productScoreRecomRoutes = require("./Routes/Productscorerecom-routes");

const PORT = process.env.PORT || 3001;
const { db } = require("./Config/config");

const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// let db;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    //   useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    // console.log(db);
    // console.log(client.connections[0].db);

    // db = client.connections[0].db;
    // app.set("db", db);
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error", err.message);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requseted-With, Content-Type, Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/productscorerecom", productScoreRecomRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
