if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router.route("/")
    .get(
        wrapAsync(listingController.index)
    )
    .post(
        isLoggedIn,
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );
    
//New route
router.get("/new" ,
    isLoggedIn, 
    listingController.renderNewForm 
);

router.route("/:id")
    .get(
        wrapAsync(listingController.showListing)
    )
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing)
    );

//Edit Route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;