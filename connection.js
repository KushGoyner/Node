const mongoose = require('mongoose');


async function connectMongoDb () {
  return  mongoose.connect('mongodb://localhost:27017/node-js-series').then(console.log("mongo Db connected")).catch((err) =>console.log("Mongo error",err) );
}

module.exports = {
    connectMongoDb,
}