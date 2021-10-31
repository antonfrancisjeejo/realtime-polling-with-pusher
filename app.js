const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/db");

const app = express();

const poll = require("./routes/poll");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/poll", poll);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is up and running");
});
