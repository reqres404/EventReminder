const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const giftRoute = require('./routes/giftRoute')
const timeFrame = require("./routes/timeFrame")

require("dotenv").config()


const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use("/api",timeFrame)
app.use("/api/user",userRoute)
app.use("/api/gift",giftRoute)

mongoose.set('strictQuery',true)
mongoose.connect(process.env.DB_URL)
.then(() => {
    app.listen(4000, () => {
      console.log(`Connected to DB and Listening to 4000!`);
    });
  })
  .catch((error) => {
    console.log("Not connected!");
    console.log("reason : ", error);
  });