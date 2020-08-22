const db = require('../config/connect');

var Users = function(user) {
    this.UserId = user.UserId;
    this.UserEmail = user.UserEmail;
    this.UserPassword = user.UserPassword;
    this.UserFristnane = user.UserFristnane;
    this.UserLastname = user.UserLastname;
    this.UserAge = user.UserAge;
    this.UserPhoto = user.UserPhoto;
    this.UserTel = user.UserTel;
    this.UserFacebook = user.UserFacebook;
    this.EducationRef = user.EducationRef;
    this.ExperienceRef = user.ExperienceRef;
    this.SkillsRef = user.SkillsRef;
    this.UserAbout = user.UserAbout;
}

Users.CreateAccounts = (newAccount , callback) => {
    db.query("INSERT INTO users SET ?", 
    newAccount , 
    (err,res) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, res.insertId);
        };
    });
};

Users.MyAccount = (accountId , callback) => {
    db.query("SELECT * FROM `users` WHERE `UserId` = ?", 
    [accountId], 
    (err,res) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, res);
        };
    });
}

Users.LoginAccount = (accountEmail, accountPassword , callback) => {
    db.query("SELECT `UserId`,`UserEmail`,`UserPassword`,`UserFristnane`,`UserLastname` FROM `users` WHERE `UserEmail` = ? AND `UserPassword` = ?", 
    [accountEmail, accountPassword], 
    (err,res) => {
        if(err){
            callback(err, null);
        }else{
            callback(null, res);
        };
    });
}

Users.UpdateAccount = (accountId, data, callback) => {
    db.query("UPDATE `users` SET ? WHERE `UserId` = ?",[data, accountId], (err,res) => {
        if(err){
            callback(err,null);
        }else{
            callback(null,res);
        };
    });
}

module.exports = Users;






















































































// Users.MyAccountValided = (accountEmail , callback) => {
//     db.query("SELECT `UserId`,`UserEmail`,`UserPassword`,`UserFristnane`,`UserLastname` FROM `users` WHERE `UserEmail` = ?", 
//     [accountEmail], 
//     (err,res) => {
//         if(err){
//             callback(err, null);
//         }else{
//             callback(null, res);
//         };
//     });
// }