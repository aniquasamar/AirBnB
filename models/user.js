const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const localPassportMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(localPassportMongoose); //Automatically generates username,salting,hashed password

module.exports = mongoose.model('User' ,userSchema);