const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')

const timeFrame = require("./routes/timeFrame")

require("dotenv").config()


const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with the origin of your React app
    methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify the allowed headers
  })
);
app.use(express.json());

app.use("/api",timeFrame)
app.use("/api/user",userRoute)

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