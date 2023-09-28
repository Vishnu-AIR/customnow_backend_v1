const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');

const userRouter = require('./user.route');
// const verifyRouter = require('./verification.route');

const app = express();


const corsOptions = {
    origin: '*', // Replace with your app's domain
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));

app.use(bodyparser.json());


app.use('/user',userRouter);
// app.use('/verification',verifyRouter);




module.exports = app;