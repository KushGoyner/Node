const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const {connectMongoDb} = require('./connection')
const userRouter = require('./ROUTES/user');



const app = express();
const PORT = 8000;


connectMongoDb();

app.use(express.json());


app.use('/users',userRouter);


app.listen(PORT, () => {
  console.log("server started at port 8000");
});