const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");


router.get("/signup" , (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup" ,wrapAsync(async(req, res) => {
    try {
        let {username ,email ,password} = req.body
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {      //passport function
            if(err) {
                return next(err);
            }
            req.flash("success" ,"Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error" ,e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login" ,saveRedirectUrl, passport.authenticate("local", {    //passport function
    failureRedirect: "/login", 
    failureFlash: true 
    }) , 
    async(req, res) => {
        req.flash("success", "Welcome back to Wanderlust.");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {           //passport function
        if(err) {
            return next(err);
        }
        req.flash("success", "successfully logged out!");
        res.redirect("/listings");
    })
});

module.exports = router;