if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Getting all the Routes in main file
const indexRoutes = require("./routes/index");
const authorRoutes = require("./routes/author");

const app = express();

// Connection to MongoDb - Start
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log("Connected to MongoDb successfully....");
});
// Connection to MongoDb - End

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// using the routes
app.use("/", indexRoutes);
app.use("/author", authorRoutes);

app.listen(process.env.PORT || 5000);
