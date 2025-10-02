const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type : String,
        required : true,
    },
    description : String,
    image :{
        type : String,
        default : "https://unsplash.com/photos/two-surfers-wait-for-waves-near-a-rocky-coastline-MA0nBwOmuwQ",
        set : (v) => v ==="" 
        ? "https://unsplash.com/photos/two-surfers-wait-for-waves-near-a-rocky-coastline-MA0nBwOmuwQ" 
        : v,
    },
    price : Number,
    location : String,
    country : String,
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;