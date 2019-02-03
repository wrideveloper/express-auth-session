// redirect to login form when user not authenticated
function authenticate(req, res, next) {
  if (!req.session.user) res.redirect("/login")
  else next()
}

module.exports = authenticate
