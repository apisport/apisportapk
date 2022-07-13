import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getDetailTransaksi(req, res) {
    const { idTransaksiReq  } = req.query
    const convertedObjectId = new ObjectId(idTransaksiReq);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let infoTransaksi = await db
            .collection('transaksi')
            .find({
                _id: convertedObjectId
            })
            .sort({ idfavorit: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(infoTransaksi)),
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
            return getDetailTransaksi(req, res);
        }
        case 'POST': {
            return addFavorit(req, res);
        }
        case 'PUT': {
            return updateDetailTransaksi(req, res);
        }
        case 'DELETE': {
            return deleteFavorit(req, res);
        }
    }
}