const prisma = require('../util/prisma_client');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

//test
router.get('/TEST', (req, res) => {
    res.send("Main route")
})

//code here

router.post('/profile', async (req, res) => {
    const profileData = {
        USER_NAME: req.body.name,
        USER_EMAIL: req.body.email,
        USER_PASSWORD: req.body.password,
        USER_NOTELP: req.body.phone,
        USER_ADDRESS: req.body.address,
        KODE_MPRO: req.body.province,
        KODE_MKEL: req.body.kelurahan,
        KODE_MKEC: req.body.kecamatan,
        KODE_AGAMA: req.body.agama,
        USER_STATUSPERNIKAHAN: req.body.statusPernikahan,
        USER_NIK: req.body.NIK,
        USER_NPWP: req.body.NPWP,
        USER_KEWARGANEGARAAN: req.body.kewarganegaraan,
        USER_GENDER: req.body.gender,
    }

    const email = req.body.email;
    const password = req.body.password;
    var user;
    var password_db;
    try {
        user = await prisma.M_USER.findFirst({
            where: {
                OR :[
                    {USER_EMAIL: email},
                    {USER_NOTELP: profileData.phone}
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

    } catch(err) {}

    bcrypt.compare(password, password_db, async function(err, result) {
        if(result){
            const payload = {
                email : req.body.emailOrPhone
            }

            const result = await prisma.M_USER.update({
                where: {UUID:user.UUID},
                data: profileData
            })
            res.send({status: "success", message : "Profile update success", data:userdata})
        } else {
            res.status(401);
            res.send({status: "failed", message : "Invalid email or password!"})
        }
    })
})

router.get('/profile', async (req, res) => {
    const email = req.body.email;

    try {
        user = await prisma.M_USER.findFirst({
            where: {
                OR :[
                    {USER_EMAIL: email},
                    {USER_NOTELP: email}
                ]
            }
        });
        userdata = {
            UUID: user.UUID,
            USER_NAME: user.USER_NAME,
            USER_PHOTOSELFIE: user.USER_PHOTOSELFIE,
            USER_EMAIL: user.USER_EMAIL,
            USER_NOTELP: user.USER_NOTELP,
            USER_ADDRESS: user.USER_ADDRESS,
            KODE_MPRO: user.KODE_MPRO,
            KODE_MKEL: user.KODE_MKEL,
            KODE_MKEC: user.KODE_MKEC,
            KODE_AGAMA: user.KODE_AGAMA,
            USER_STATUSPERNIKAHAN: user.USER_STATUSPERNIKAHAN,
            USER_NIK: user.USER_NIK,
            USER_NPWP: user.USER_NPWP,
            USER_KEWARGANEGARAAN: user.USER_KEWARGANEGARAAN,
            USER_GENDER: user.USER_GENDER,
        }

        res.send({
            message:"Success",
            data: userdata
        })

    } catch(err) {}
})

router.get('/bank/all', async (req, res) => {
    const banklist = await prisma.M_BANK.findMany({});
    res.send({message: "success", data: banklist})
})

router.post('/bank/create', async (req, res) => {

    if(!req.body.KODE_MBANK){
        res.send({
            status: "failed",
            message: "error, KODE_MBANK must not be empty"})
    }

    const bankData = {
        KODE_MBANK : req.body.KODE_MBANK,
        NAMA_MBANK : req.body.NAMA_MBANK,
        NOMOR_REKENING : req.body.NOMOR_REKENING,
        NOMOR_KARTU : req.body.NOMOR_KARTU,
        VALID_TAHUN : req.body.VALID_TAHUN,
        VALID_BULAN  : req.body.VALID_BULAN,
        USER_CCV : req.body.USER_CCV,
        BUKU_REKENING : req.body.BUKU_REKENING,
        STATUS_AKTIF : req.body.STATUS_AKTIF,
        CREATE_USER : req.body.USER_UUID,
        CREATE_DATE : new Date()
    }

    try {
        const bank = await prisma.M_BANK.findFirst({
            where: {KODE_MBANK : bankData.KODE_MBANK}
            
        })

        if(bank) {
            res.send({
                status :"failed",
                message :"Bank code already registered"
            })
        } else {
            await prisma.M_BANK.create({
                data: bankData
            })
            res.send({
                status :"success",
                message :`Bank ${bankData.NAMA_MBANK} with code ${bankData.KODE_MBANK} created successfully`
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/wallet/all', async (req, res) => {
    const walletlist = await prisma.M_WALLET.findMany({});
    res.send({message: "success", data: walletlist})
})
router.post('/wallet/create', async (req,res) => {
    const dataWallet = {
        KODE_MWALLET: req.body.KODE_MBANK,
        CREATE_USER: req.body.CREATE_USER,
        CREATE_DATE: new Date(),
        USER_SALDO: req.body.INITIAL_DEPOSIT,
        USER_DEPOSIT: req.body.INITIAL_DEPOSIT,
    }
    try {
        const existBank = await prisma.M_BANK.findFirst({
            where: {
                KODE_MBANK:dataWallet.KODE_MWALLET
            }
        })

        if(!existBank){
            res.send({
                status: "failed",
                message: "Bank code not found"
            })
        }
    } catch (error) {
        console.log(error);
    }
    try {
        const exist = await prisma.M_WALLET.findFirst({
            where:{KODE_MWALLET: req.body.KODE_MBANK}
        })

        if(exist) {
            res.send({
                status :"failed",
                message :"Wallet with this Bank code already registered"
            })
        } else {
            await prisma.M_WALLET.create(
                {data: dataWallet}
            )
            res.send({
                status :"success",
                message :`Wallet with bank code ${dataWallet.KODE_MWALLET} created successfully with inital deposit ${dataWallet.USER_SALDO}`
            })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/wallet', async (req, res) => {
    const walletlist = await prisma.M_WALLET.findFirst({
        where : {KODE_MWALLET : req.body.KODE_MBANK}
    });
    res.send({message: "success", data: walletlist})
})

router.post('/wallet/deposit', async(req, res) => {
    const checkWallet = await prisma.M_WALLET.findFirst({
        where : {KODE_MWALLET : req.body.KODE_MBANK}
    });

    if(!checkWallet){
        res.send({
            status :"failed",
            message :"Wallet with bank code not found"
        })
    } else {
        checkWallet.USER_SALDO += req.body.DEPOSIT_VALUE;
        checkWallet.USER_DEPOSIT += req.body.DEPOSIT_VALUE;
        checkWallet.UPDATE_DATE = new Date();

        const newData = await prisma.M_WALLET.update({
            where : {KODE_MWALLET : req.body.KODE_MBANK},
            data: checkWallet
        })
        res.send({
            status :"succes",
            message :`Deposit success, new saldo is ${checkWallet.USER_SALDO}`
        })
    }
})

router.post('/wallet/withdraw', async(req, res) => {
    const checkWallet = await prisma.M_WALLET.findFirst({
        where : {KODE_MWALLET : req.body.KODE_MBANK}
    });

    if(!checkWallet){
        res.send({
            status :"failed",
            message :"Wallet with bank code not found"
        })
    } else {
        checkWallet.USER_SALDO -= req.body.WITHDRAW_VALUE;
        checkWallet.USER_WITHDRAWL += req.body.WITHDRAW_VALUE;
        checkWallet.UPDATE_DATE = new Date();

        const newData = await prisma.M_WALLET.update({
            where : {KODE_MWALLET : req.body.KODE_MBANK},
            data: checkWallet
        })
        res.send({
            status :"succes",
            message :`Withdraw success, new saldo is ${checkWallet.USER_SALDO}`
        })
    }
})
////////////////////////////////

module.exports = router