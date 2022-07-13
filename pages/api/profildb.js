import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getProfil(req, res) {
    const { emailReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let profil = await db
            .collection('user')
            .find({
                email: emailReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(profil)),
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
            return getProfil(req, res);
        }
        case 'POST': {
            return addFavorit(req, res);
        }
        case 'PUT': {
            return updateFavorit(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}