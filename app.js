const express = require("express");
const app = express();

const userRouter = require("./routers/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
