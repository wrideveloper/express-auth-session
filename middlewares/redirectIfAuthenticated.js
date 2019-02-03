// redirect user to home page if already authenticated
function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) res.redirect("/")
  else next()
}

module.exports = redirectIfAuthenticated
