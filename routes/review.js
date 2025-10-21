const express = require("express");
const router = express.Router( { mergeParams: true} );
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewares.js");

const reviewController = require("../controllers/review.js");

//Review (POST Route)
router.post("/" ,
    validateReview ,
    isLoggedIn, 
    wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete("/:reviewId" ,
    isLoggedIn, isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;