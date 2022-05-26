const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected!");
  });

app.get("/", (req, res, next) => {
  res.send("server connected!!");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
