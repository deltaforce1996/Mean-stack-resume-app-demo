var util = require("util");

var Validated = async (UserFristnane, UserLastname, UserEmail) => {
  if (UserFristnane == "" || UserLastname == "" || UserEmail == "") {
    return false;
  }
  return true;
};

var CheckSameEmail = async (Useremail) => {
  setTimeout(function () {
    console.log("wait");
    return true;
  }, 8000);
};

var AutoGenarate = async () => {
  let currentdate = new Date();
  let userId = util.format(
    "%s%s%s%s%s%s%s",
    currentdate.getFullYear(),
    (currentdate.getMonth() + 1 < 10 ? "0" : "") + (currentdate.getMonth() + 1),
    (currentdate.getDate() < 10 ? "0" : "") + currentdate.getDate(),
    (currentdate.getHours() < 10 ? "0" : "") + currentdate.getHours(),
    (currentdate.getMinutes() < 10 ? "0" : "") + currentdate.getMinutes(),
    (currentdate.getSeconds() < 10 ? "0" : "") + currentdate.getSeconds(),
    (currentdate.getMilliseconds() < 10
      ? "00"
      : currentdate.getMilliseconds() < 100
      ? "0"
      : "") + currentdate.getMilliseconds()
  );
  return userId;
};

 var validateEmailFunc = function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var TelFormatFunc = function (tel) {
  if (!tel) { return ''; }
  var value = tel.toString().trim().replace(/^\+/, '');
  if (value.match(/[^0-9]/)) {
      return tel;
  }
  var country, city, number;
  switch (value.length) {
      case 10: 
          country = 1;
          city = value.slice(0, 3);
          number = value.slice(3);
          break;

      case 11: 
          country = value[0];
          city = value.slice(1, 4);
          number = value.slice(4);
          break;

      case 12: 
          country = value.slice(0, 3);
          city = value.slice(3, 5);
          number = value.slice(5);
          break;

      default:
          return tel;
  }

  if (country == 1) {
      country = "";
  }

  number = number.slice(0, 3) + '-' + number.slice(3);
  return (country + " (" + city + ") " + number).trim();
};

module.exports = {Validated,CheckSameEmail,AutoGenarate,TelFormatFunc,validateEmailFunc};

//  Users.MyAccount(Useremail, (err, result) => {
//     if(err){
//       sucess= false;
//     }
//     if(result.length > 0){
//       sucess= false;
//       console.log(sucess);
//     }

//   });
//   return true;
