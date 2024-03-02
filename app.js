import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import startDB from "./db/connect.js";
import userRouter from "./routes/user.route.js";
import createError from "http-errors";
import dotenv from "dotenv";
import authrouter from "./routes/auth.route.js";
// import { errorHandlerMiddleware } from "./middleware/error-handler.js";
dotenv.config();
startDB()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));
const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(process.env.ACCESS_TOKEN));

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("e-commerce-api");
});
app.use("/auth", authrouter);
app.use("/user", userRouter);

app.use(async (req, res, next) => {
  next(createError("The Route does not exist"));
});

app.use((err, req, res, nex) => {
  err.status = err.status || 500;
  res.json({
    data: null,
    Successs: false,
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// app.use(errorHandlerMiddleware());
const startTheServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startTheServer();
