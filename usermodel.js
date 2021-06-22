const mongoose = require('mongoose');
const userschema = new mongoose.Schema({

name:{
    type:String,
    //required:true
},
email:{
    type:String,
    //required:true,
    //unique:true,
},
password:{
    type:String,
    //required:true,
    //minlength:4,
},

})

module.exports = mongoose.model('user', userschema) // model asks a single name to send schema so this model will this type of schema
                                                     // agr same file me kaam krna hoga to module.exports ki jagh ek variable me store krayenge