// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").load();
// }

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/myLibrary", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("Connected to MongoDb successfully....");
});

const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.use("/", indexRoutes);

app.listen(process.env.PORT || 5000);
