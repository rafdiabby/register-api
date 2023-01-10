const prisma = require('../util/prisma_client');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//test
router.get('/TEST', (req, res) => {
    res.send("MANTAPPU")
})


//register user
router.post('/Register', async (req, res) => {
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const kewarganegaraan = req.body.kewarganegaraan;

    const saltRounds = 10;
    let user;

    bcrypt.hash(password, saltRounds, async function(err, hash) {
        user = {
            UUID: uuidv4(),
            USER_NAME: name,
            USER_EMAIL: email,
            USER_PASSWORD: hash,
            USER_NOTELP: phone,
            USER_KEWARGANEGARAAN: kewarganegaraan,
            CREATE_DATE : new Date()
        }
        try {
            //check if user is already registered
            const exist = await prisma.M_USER.findFirst({
                where: {USER_EMAIL: email}
            })
            if(exist){
                res.send({message:"Failed to create user, email is already exist"})
            } else {
                const newUser = await prisma.M_USER.create({
                    data: user
                })
                console.log(newUser);
                res.send({message:`Success registered account with email ${email}`})
            }
        }catch (err) {console.log(err)}
    })
})


//login user
router.post('/Login', async (req, res) => {

    
    const emailOrPhone = req.body.emailOrPhone;
    const password = req.body.password;

    var userdata;
    var password_db;
    try {
        const user = await prisma.M_USER.findFirst({
            where: {
                OR :[
                    {USER_EMAIL: emailOrPhone},
                    {USER_NOTELP: emailOrPhone}
                ]
            }
        });
        password_db = user.USER_PASSWORD
        userdata = {
            UUID: user.UUID,
            USER_NAME: user.USER_NAME,
            USER_PHOTOSELFIE: user.USER_PHOTOSELFIE,
            USER_EMAIL: user.USER_EMAIL,
            USER_NOTELP: user.USER_NOTELP
        }

        //todo - ketika berhasil tarik data-data sbb :
//   . uuid
//   . user_name
//   . user_photoprofile
//   . nomor telepon / email

    } catch(err) {}

    bcrypt.compare(password, password_db, function(err, result) {
        if(result){
            const payload = {
                email : req.body.emailOrPhone
            }
            const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn:30})
            res.send({status: "success", message : "Login success", data:userdata,token: token})
        } else {
            res.status(401);
            res.send({status: "failed", message : "Invalid email or password!"})
        }
    })
})



module.exports = router