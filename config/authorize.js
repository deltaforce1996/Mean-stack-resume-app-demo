const jwt = require('jsonwebtoken')  // ใช้งาน jwt module
const fs = require('fs') // ใช้งาน file system module ของ nodejs
 
// สร้าง middleware ฟังก์ชั่นสำหรับ verification token
const authorization = ((req, res, next) => {
    const authorization = req.headers['authorization']  // ดึงข้อมูล authorization ใน header
    // ถ้าไม่มีการส่งค่ามา ส่ง ข้อความ json พร้อม status 401 Unauthorized
    if(authorization===undefined) return res.status(401).json({
        "status": 401,
        "message": "Unauthorized"
    })   
    // ถ้ามีการส่งค่ามา แยกเอาเฉพาะค่า token จากที่ส่งมา 'Bearer xxxx' เราเอาเฉพาะ xxxx
    // แยกข้อความด้วยช่องว่างได้ array สองค่า เอา array key ตัวที่สองคือ 1 
    // array key เริ่มต้นที่ 0 จะเได้ key เท่ากับ 1 คือค่า xxxx ที่เป้น token
    const token = req.headers['authorization'].split(' ')[1]
    if(token===undefined) return res.status(401).json({ // หากไมมีค่า token
        "status": 401,
        "message": "Unauthorized"
    })   
    // ใช้ค่า privateKey เ็น buffer ค่าที่อ่านได้จากไฟล์ private.key ในโฟลเดอร์ config
    const privateKey = fs.readFileSync(__dirname+'/../config/private.key')
    // ทำการยืนยันความถูกต้องของ token
    jwt.verify(token, privateKey, function(error, decoded) {
        if(error) return res.status(401).json({ // หาก error ไม่ผ่าน
            "status": 401,
            "message": "Unauthorized"
        })   
        console.log(error)
        console.log(decoded)     
        // หากตรวจสอบยืนยันแล้ว ผ่าน
        // ตรงนี้ จะกำหนดสิทธิ์เพิ่มเติม  มีหรือไม่ก็ได้ ในกรณีนี้   เราตรวจสอบเพิ่มเติมว่า 
        // decoded.role ต้องเป็น 'admin' ด้วยถึงจะแสดงข้อมูลได้ ซึ่งค่า role นี้เราจะส่งมากับ payload
        // ถ้าไม่ผ่าน เช่นไม่ได้ส่งค่า role มาด้วยหรือ ค่า role เป็น 'user' ไม่ใช่ 'admin' ก็จะส่งค่า status 403 Forbidden
        // if(decoded.role===undefined || decoded.role!=='admin') return res.status(403).json({
        //     "status": 403,
        //     "message": "Forbidden"
        // })   
        // ถ้าทุกอย่างผ่าน ทุกเงื่อนไข ก็ไปทำ middleware ฟังก์ชั่นในลำดับถัดไป
        next()
    })
})
 
module.exports = authorization   // ส่ง middleware ฟังก์ชั่นไปใช้งาน











// const express = require('express')
// const router = express.Router()
// const { validation, schema } = require('../validator/users')
// const db = require('../config/db')
// const authorization = require('../config/authorize')
 
// router.route('/users?')
//     .get(authorization, (req, res, next) => { 
//         db.then((db)=>{  // เมื่อมีการเชื่อมต่อไปยัง MongoDB server เรียบร้อยแล้ว
//              db.collection('tbl_users')
//              .find().toArray( (error, results) => { // แสดงข้อมูลของ tbl_usrs ทั้งหมด
//                 if(error) return res.status(500).json({
//                     "status": 500,
//                     "message": "Internal Server Error"
//                 })    
//                 const result = {
//                     "status": 200,
//                     "data": results
//                 }
//                 return res.json(result)                      
//              })            
//         })
//     })
//     .post(validation(schema),(req, res, next) => {   
//         db.then((db)=>{  // เมื่อมีการเชื่อมต่อไปยัง MongoDB server เรียบร้อยแล้ว
//             // ก่อนเพิ่มข้อมลใหม่ 
//             db.collection('tbl_lastid')  // ทำการดึง id ล่าสุดจาก tbl_lastid ที่ได้บันทึกไว้
//             .findOneAndUpdate({id:1},
//             { $inc: { user_id: 1 }},(error, results)=>{ // ถ้าเจอก็ให้อัพเดทค่าเก่า เพื่อให้ค่าไม่ซ้ำกัน
//                 if(error) return res.status(500).json({
//                     "status": 500,
//                     "message": "Internal Server Error"
//                 })    
//                 // ใช้ค่า user_id จาก tbl_lastid มาบวกค่าเพิ่ม เพื่อนำไปใช้งาน
//                 let ID = results.value.user_id+1
//                 // เตรียมข้อมูลที่จะทำการเพิ่ม 
//                 let user = {
//                     "id": ID, // จะได้ค่า ID เป็น auto incremnt ที่เราประยุกต์ขึ้นมา ค่าจะไม่ซ้ำกัน
//                     "name": req.body.name, 
//                     "email": req.body.email 
//                 }            
//                 db.collection('tbl_users')
//                 .insertOne(user, (error, results) => { // ทำการเพิ่มข้อมูลไปยัง tbl_users
//                     if(error) return res.status(500).json({
//                         "status": 500,
//                         "message": "Internal Server Error"
//                     })
//                     // เพื่อไม่ต้องไปดึงข้อมูลที่เพิ่งเพิม มาแสดง ให้เราใช้เฉพาะ id ข้อมูลใหม่ที่เพิ่งเพิม
//                     // รวมกับชุดข้อมูลที่เพิ่งเพิ่ม เป็น ข้อมูลที่ส่งกลับออกมา
//                     user = [{_id:results.insertedId, ...user}]
//                     const result = {
//                         "status": 200,
//                         "data": user
//                     }
//                     return res.json(result)     
//                 })                                      
//             })
//         })        
//     })
   
// router.route('/user/:id')
//     .all((req, res, next) => { 
//         db.then((db)=>{  // เมื่อมีการเชื่อมต่อไปยัง MongoDB server เรียบร้อยแล้ว
//             db.collection('tbl_users') // แสดงข้อมูล user ตาม id ที่ส่งมา เพื่อให้แน่ใจว่าจะเป็นตัวเลข เราใส่ +นำหน้าตัวแปร
//             .find({id:+req.params.id}).toArray( (error, results) => {
//                 // หาก error หรือไม่พบข้อมูล
//                 if(!results.length) return res.status(400).json({
//                     "status": 400,
//                     "message": "Not found user with the given ID"
//                 })                 
//                 res.user = results // ส่งต่อข้อมูลไปยัง method ที่มีการใช้งาน
//                 next()
//             })
//         })
//     })
//     .get((req, res, next) => { 
//         // ถ้าเป็นแสดงข้อมํลของ id ที่ส่งมา ใช้ค่า results ที่ส่งมาจาก middleware ก่อนหน้า แล้วนำไปแสดง
//         const result = {
//             "status": 200,
//             "data": res.user
//         }
//         return res.json(result)
//     })
//     .put(validation(schema),(req, res, next) => {   
//         db.then((db)=>{ // เมื่อมีการเชื่อมต่อไปยัง MongoDB server เรียบร้อยแล้ว
//             // เมื่อมีการแก้ไขข้อมูล  เตรียมข้อมูลสำหรับแก้ไข
//             let user = {
//                 "id": +req.params.id,
//                 "name": req.body.name, 
//                 "email": req.body.email 
//             }              
//             db.collection('tbl_users')
//             .updateOne({id:+req.params.id}, // ทำการแก้ไขค่าให้ตรงกับ id ที่กำหนด
//             { $set: user }, (error, results) => {
//                 if(error) return res.status(500).json({
//                     "status": 500,
//                     "message": "Internal Server Error"
//                 })
//                 // ถ้ามีการแก้ไขค่าใหม่ 
//                 if(results.modifiedCount > 0) {
//                     // เอาค่าฟิลด์ทีได้ทำการอัพเดท ไปอัพเดทกับข้อมูลทั้งหมด
//                     user = Object.assign(res.user[0], user)
//                 }else{ // มีการอัพเดท แต่เป็นค่าเดิม
//                     user = res.user
//                 }                
//                 const result = {
//                     "status": 200,
//                     "data": user
//                 }
//                 return res.json(result)        
//             })
//         })
//     })
//     .delete((req, res, next) => { 
//         db.then((db)=>{ // เมื่อมีการเชื่อมต่อไปยัง MongoDB server เรียบร้อยแล้ว
//             db.collection('tbl_users')
//             .deleteOne({id:+req.params.id}, (error, results) => {
//                 if(error) return res.status(500).json({
//                     "status": 500,
//                     "message": "Internal Server Error"
//                 })
//                 const result = {
//                     "status": 200,
//                     "data": res.user
//                 }
//                 return res.json(result)        
//             })
//         })
//     })
   
// module.exports = router