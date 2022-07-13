import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getDetailLapangan(req, res) {
    const { usernameReq, passwordReq } = req.query
    const convertedObjectId = new ObjectId(idLapangan);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let infoVenue = await db
            .collection('mitra')
            .find({
                username : usernameReq,
                password : passwordReq
            }, { projection: { 'username': 1, 'password': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let infoDev = await db
            .collection('dev')
            .find({
                username: usernameReq,
                password: passwordReq
            }, { projection: { 'username': 1, 'password': 1 } })
            .sort({ idfavorit: -1 })
            .toArray()
        let hasil = {}
        hasil['loginMitra'] = infoVenue
        hasil['loginDev'] = infoDev
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(hasil)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// CRUD handler
export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getDetailLapangan(req, res);
        }
    }
}