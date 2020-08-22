var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index.route");
var usersRouter = require("./routes/users.route");
var managementRounter = require("./routes/management.route");
var contentsRounter = require("./routes/contents.route");
var dashboardRounter = require("./routes/dashboard.route");
var modalContentRounter = require("./routes/modal-new-project.route");
var logInRouter = require("./routes/login.route");

var app = express();

var server = app.listen(8887, function() {
  console.log('Ready on port %d', server.address().port);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/profile", usersRouter);
app.use("/management", managementRounter);
app.use("/contents", contentsRounter);
app.use("/dashboard", dashboardRounter);
app.use("/modal-new-project-content", modalContentRounter);
app.use("/login", logInRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
