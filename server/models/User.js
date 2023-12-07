const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "regular"],
        default: "regular",
      },
});
  
const Users = mongoose.model('User', userSchema);
 
module.exports = Users;