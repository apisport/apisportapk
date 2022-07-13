import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getVenue(req, res) {
    const { namaVenueReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let infoVenue = await db
            .collection('mitra')
            .find({
                namaVenue: namaVenueReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        // return the posts
        let infoLapangan = await db
            .collection('lapangan')
            .find({
                namaVenue: namaVenueReq
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let hasil = {}
        hasil['infoVenue'] = infoVenue
        hasil['infoLapangan'] = infoLapangan
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
            return getVenue(req, res);
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