const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getTransaksi(req, res) {
    const { namaVenueReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let transaksi = await db
            .collection('transaksi')
            .find({
                namaVenue: namaVenueReq,
                status: { $ne: 'lunas' },
                buktiBayar: { $ne: null }
            }, { projection: { 'status': 1 } })
            .sort({ idTransaksi: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(transaksi)),
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
// menambah data kedalam collection Transaksi
async function addTransaksi(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('transaksi').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Data Transaksi Telah di Tambahkan',
            success: true,
        });
    } catch (error) {
        // return an error
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
            return getTransaksi(req, res);
        }
        case 'POST': {
            return addTransaksi(req, res);
        }
        case 'PUT': {
            return updateTransaksi(req, res);
        }
        case 'DELETE': {
            return deleteTransaksi(req, res);
        }
    }
}