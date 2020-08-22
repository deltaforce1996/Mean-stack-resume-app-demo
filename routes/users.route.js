var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken"); // ใช้งาน jwt module
const fs = require("fs"); // ใช้งาน file system module ของ nodejs
const multer = require('multer');

var Users = require("../model/users.model");
var Ulits = require("../ulits/ulits");
var Authorization = require("../config/authorize");

var storage = require("../ulits/multer.option");
var filesfilter = require("../ulits/files.filer");

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filesfilter,
}).single("uploaded_file");

router.post("/newAccount", async (req, res) => {
  if (
    !(await Ulits.Validated(
      req.body.UserFristnane,
      req.body.UserLastname,
      req.body.UserEmail
    ))
  ) {
    res.status(400).json({
      error: true,
      message: "Failed, Because some field have null value.",
    });
    return;
  }

  let Id = await Ulits.AutoGenarate();

  let userId =
    Id +
    "ACC" +
    req.body.UserFristnane.substring(0, 1) +
    req.body.UserLastname.substring(0, 1);
  let educationRef =
    Id +
    "EDU" +
    req.body.UserFristnane.substring(0, 1) +
    req.body.UserLastname.substring(0, 1);
  let experienceRef =
    Id +
    "EXP" +
    req.body.UserFristnane.substring(0, 1) +
    req.body.UserLastname.substring(0, 1);

  let skillsRef =
    Id +
    "SKL" +
    req.body.UserFristnane.substring(0, 1) +
    req.body.UserLastname.substring(0, 1);

  let account = {
    UserEmail: req.body.UserEmail,
    UserPassword: req.body.UserPassword,
    UserFristnane: req.body.UserFristnane,
    UserLastname: req.body.UserLastname,
    UserId: userId,
    EducationRef: educationRef,
    ExperienceRef: experienceRef,
    SkillsRef: skillsRef,
  };

  let newAccount = new Users(account);
  Users.CreateAccounts(newAccount, (err, result) => {
    if (err) res.status(400).json({ error: true, message: err.message });
    res
      .status(200)
      .json({ error: false, message: "Create account success.", data: result });
  });
});

router.put("/editAccount", Authorization, (req, res) => {
  let param = new Users(req.body);
  Users.UpdateAccount(param.UserId, param, (err, result) => {
    if (err)
      res.status(400).json({ error: true, message: "Failed, " + err.message });
    res.status(200).json({ error: false, message: "Updated account success." });
  });
});

router.get("/loginAccount", (req, res) => {
  // ใช้ค่า privateKey เป็น buffer ค่าที่อ่านได้จากไฟล์ private.key ในโฟลเดอร์ config
  Users.LoginAccount(
    req.query.UserEmail,
    req.query.UserPassword,
    (err, result) => {
      if (err)
        res
          .status(400)
          .json({ error: true, message: "Failed, " + err.message, token: [] });
      if (result.length > 0) {
        const payload = {
          UserId: result[0].UserId,
          UserEmail: result[0].UserEmail,
          UserFristnane: result[0].UserFristnane,
          UserLastname: result[0].UserLastname,
        };
        const privateKey = fs.readFileSync(
          __dirname + "/../config/private.key"
        );
        // ทำการลงชื่อขอรับ token โดยใช้ค่า payload กับ privateKey
        const token = jwt.sign(payload, privateKey, { expiresIn: 60 });
        res.json({ error: false, massage: "Login Success.", token: token });
      } else {
        res.json({ error: false, massage: "Login Failed.", token: [] });
      }
    }
  );
});

router.post("/uploadsPhotocontent", (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.json({error:true, massage:err.message});
    } else if (err) {
      // An unknown error occurred when uploading.
      res.json({error:true, massage:err.massage});
    }
    // Everything went fine.
    res.json({ error:false, massage:req.body.content, file:req.file});
  });

});

var CallbackFunc = (callback) =>{
  var millisecondsToWait = 500;
setTimeout(function() {
    
}, millisecondsToWait);
}

router.get("/callbackFunc", ()=>{

})

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("profile", { title: "Express" });
});

module.exports = router;
