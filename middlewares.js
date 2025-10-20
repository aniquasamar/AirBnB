module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) { //isAuthenticated (passport function)
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to continue the task!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};