function requireLoggedInUser(req, res, next) {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        next();
    }
}
function requireLoggedOutUser(req, res, next) {
    if (req.session.userId) {
        res.redirect("/petition");
    } else {
        next();
    }
}
function requireSignature(req, res, next) {
    if (!req.session.user || !req.session.user.sigId) {
        res.redirect("/petition");
    } else {
        next();
    }
}
function requireNoSignature(req, res, next) {
    if (req.session.user && req.session.user.sigId) {
        res.redirect("/thanks");
    } else {
        next();
    }
}

module.exports = {
    requireLoggedInUser,
    requireLoggedOutUser,
    requireNoSignature,
    requireSignature,
};
