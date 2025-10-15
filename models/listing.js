const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");

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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete" , async (listing) => {
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;