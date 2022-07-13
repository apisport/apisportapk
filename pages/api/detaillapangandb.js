import Router from 'next/router';
const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function getDetailLapangan(req, res) {
    const { idLapangan, namaVenueReq, namaLapanganReq, tglMainReq } = req.query
    const convertedObjectId = new ObjectId(idLapangan);
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        let infoLapangan = await db
            .collection('lapangan')
            .find({
                _id: convertedObjectId
            })
            .sort({ idfavorit: -1 })
            .toArray();
        let infoVenue = await db
            .collection('mitra')
            .find({
                namaVenue: namaVenueReq
            }, { projection: { 'namaVenue': 1, 'hariOperasional': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let infoTransaksi = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
                lapangan: namaLapanganReq,
                tglMain: tglMainReq
            }, { projection: { 'tglMain': 1, 'jadwalMain': 1 } })
            .sort({ idfavorit: -1 })
            .toArray();
        let hasil = {}
        hasil['infoTransaksi'] = infoTransaksi
        hasil['infoLapangan'] = infoLapangan
        hasil['infoVenue'] = infoVenue
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