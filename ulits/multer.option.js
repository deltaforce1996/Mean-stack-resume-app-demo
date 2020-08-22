const multer = require("multer");
const fs = require("fs");

var createDir = (dirPath, callback) => {
  if (fs.existsSync(dirPath)){
    callback(false, dirPath)
  }
  
  fs.mkdirSync(dirPath, { recursive: true });
  callback(false, dirPath);
};

var filetype = (type) => {
  if (type === "image/jpeg") {
    return "jpg";
  }
  if (type === "image/png") {
    return "png";
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    createDir("public/images/uploads/contents/" + req.body.userId,(err,result)=>{
      if(!err){
        console.log('callback : ' + result)
        return cb(null, "" +result);
      }
    })
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + filetype(file.mimetype)
    );
  },
});

module.exports = storage;
