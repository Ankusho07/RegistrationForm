const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/akdb", {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{ //database name can not have '/'

if (err) throw err;
console.log('connected')
}

);

module.exports = mongoose.connection;  // here we exporting connection

// mongo db apni taraf se database bna dta haii

//show dbs     y command  sare databse dikha degii, mongo shell me jake hit krenge

//db.collection('users').insertOne(req.body); // y ek collection bnayega users name ka akdb ke ander
//use akdb    , akdb databse k andr chle jayenge

//db.users.find()    users collectionke ander jo data hai wo show ho jayega