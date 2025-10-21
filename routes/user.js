const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

const userController = require("../controllers/user");

router.get("/signup" ,
    userController.renderSignupForm 
);

router.post("/signup" ,
    wrapAsync(userController.signup)
);

router.get("/login", 
    userController.renderLoginForm
);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        {    //passport function
            failureRedirect: "/login",
            failureFlash: true
        }),
    userController.login
);

router.get("/logout", 
    userController.logout
);

module.exports = router;