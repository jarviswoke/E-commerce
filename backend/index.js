require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConnect = require("./Models/dbConnect");
const authRouter = require("./Routes/authRoute");
const productRouter = require("./Routes/productRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./Middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5050;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);

dbConnect()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
  // // Routes
// app.get("/", (req, res) => {
//   res.send("Hello from Server Side...");
// });

// app.get("/ping", (req, res) => {
//   res.send("PONG");
// });