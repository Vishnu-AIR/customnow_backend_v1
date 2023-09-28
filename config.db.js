const mongoose = require('mongoose');

const connection = mongoose.createConnection("mongodb+srv://user:lakshay@form.lsyxxi0.mongodb.net/customnow")
.on('open',()=>{
    console.log("connected to db")
})
.on('error',(error)=>{
    console.log(error);
});

module.exports = connection;