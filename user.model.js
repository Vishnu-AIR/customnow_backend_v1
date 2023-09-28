const mongoose = require('mongoose');
const db = require("./config.db");

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    phone:{
        type:String,
        require:true,
        unique: true
    },
    updatedOn: { type: Date },
    createdOn: { type: Date }
})

userSchema.pre('save', async function(next) {
   
    this.updatedOn = new Date();
    this.createdOn = new Date();


    // Hash the password
    
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {


    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    
     

    next();

    // Hash the password
    
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('----------------no password',this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
        // if(candidatePassword == this.password){
        //     return true
        // }else{
        //     return false
        // }

    } catch (error) {
        throw error;
    }
};

const userModel = db.model('users',userSchema);

module.exports = userModel;