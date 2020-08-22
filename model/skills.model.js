const db = require('../config/connect');

var Skills = (skill) => {
    SkillId  = skill.SkillId,
    SkillName  = skill.SkillName ,
    SkillValue  = skill.SkillValue ,
    SkillRef  = skill.SkillRef 
}

Skills.NewSkill = (newItem, callback) => {
    db.query("INSERT INTO `skills` SET ?",[newItem], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Skills.EditSkill = (newItem, skillId, callback) => {
    db.query("UPDATE `skills` SET ` ?  WHERE `SkillId` = ?",[newItem, skillId], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Skills.DeleteSkill = (skillId, callback) => {
    db.query("DELETE FROM `skills` WHERE `SkillId` = ?",[skillId] ,(err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};

Skills.MySkills = (skillRef, callback) => {
    db.query("SELECT * FROM `skills` WHERE `SkillRef` = ?", [skillRef], (err, res) => {
        if(err) callback(err, null);
        callback(null, res);
    });
};