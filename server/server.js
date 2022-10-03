const express = require("express");
const mongoose = require('mongoose');
const fs = require("fs");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/transaction"));
const dbo = require("./db/conn");

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')))

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});