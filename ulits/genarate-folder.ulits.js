const genarate = () => {
    mkdirp(
        "../public/images/uploads" +
          moment().format("MM-DD-YY") +
          "/" +
          moment().format("HH"),
        function (err) {
          if (err) console.error(err);
          console.log("==================================");
          console.log("tmp folder created");
          console.log("==================================");
          next();
        }
      );
}

module.exports.genarate = function (req, res, next) {
  switch (req.body.type) {
    case "contents":
      break;
    case "projects":
      break;
    default:
      break;
  }
};
