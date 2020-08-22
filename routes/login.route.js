var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("logIncontent", { title: "Express" });
});

router.get("/newAccount", function (req, res) {
  res.send({ massage: "Api on rount newAccount" });
});

module.exports = router;
