const express = require("express")
const session = require("express-session")
const authenticate = require("./middlewares/authenticate")
const redirectIfAuthenticated = require("./middlewares/redirectIfAuthenticated")
const app = express()

// parsing url encoded request
app.use(express.urlencoded({ extended: true }))

// parsing session
app.use(
  session({
    secret: "auth-session",
    saveUninitialized: false,
    resave: false
  })
)

// show form login
app.get("/login", redirectIfAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/views/login.html")
})

// receive login post and authenticate user
app.post("/login", redirectIfAuthenticated, (req, res) => {
  const { username, password } = req.body
  if (username === "admin" && password === "admin") {
    req.session.user = { username: "admin" }
    res.redirect("/")
  } else {
    res.redirect("/login")
  }
})

// logout the user
app.get("/logout", function(req, res) {
  req.session.user = undefined
  res.redirect("/login")
})

// show home page when user already authenticated
app.get("/", authenticate, function(req, res) {
  res.sendFile(__dirname + "/views/home.html")
})

app.listen(3000)
