const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middlewares.js");

const listingController = require("../controllers/listing.js");

//index route
router.get("/" , 
    wrapAsync(listingController.index)
);

//New route
router.get("/new" ,
    isLoggedIn, 
    listingController.renderNewForm 
);

//Show route
router.get("/:id" , 
    wrapAsync(listingController.showListing)
);

//Create route
router.post("/" ,
    isLoggedIn, 
    validateListing , 
    wrapAsync(listingController.createListing)
);

//Edit Route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.renderEditForm)
);

//update route
router.put("/:id" ,
    isLoggedIn,
    isOwner, 
    validateListing , 
    wrapAsync(listingController.updateListing)
);

//Delete route
router.delete("/:id" ,
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.destroyListing)
);

module.exports = router;