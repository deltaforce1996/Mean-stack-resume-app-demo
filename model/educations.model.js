const db = require('../config/connect');

var Educations = (education) => {
    EducationId = education.EducationId,
    EducationsName = education.EducationsName,
    EductionYear = education.EductionYear,
    EducationRef = education.EducationRef,
    EducationAt = education.EducationAt
}

Educations.NewEducation = (newItem, callback) => {
    db.query("INSERT INTO `educations` SET ?",[newItem], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Educations.EditEducation = (newItem, educationId, callback) => {
    db.query("UPDATE `educations` SET ` ?  WHERE `EducationId` = ?",[newItem, educationId], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Educations.DeleteEducation = (educationId, callback) => {
    db.query("DELETE FROM `educations` WHERE `EducationId` = ?",[educationId] ,(err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Educations.MyEducation = (educationRef, callback) => {
    db.query("SELECT * FROM `educations` WHERE `EducationRef` = ?", [educationRef], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};