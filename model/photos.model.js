const db = require('../config/connect');

var Photos = (photo) => {
    PhotoId = photo.PhotoId,
    PhotoName = photo.PhotoName,
    PhotoPath = photo.PhotoPath,
    UserId = photo.UserId
};

Photos.NewPhotos = (newItem, callback) => {
    db.query("INSERT INTO `photos` SET ?",[newItem], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Photos.EditPhotos = (newItem, photoId, callback) => {
    db.query("UPDATE `photos` SET ` ?  WHERE `PhotoId` = ?",[newItem, photoId], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Photos.DeletePhotos = (photoId, callback) => {
    db.query("DELETE FROM `photos` WHERE `PhotoId` = ?",[photoId] ,(err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Photos.MyPhotos = (userId, callback) => {
    db.query("SELECT * FROM `photos` WHERE `UserId` = ?", [userId], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};