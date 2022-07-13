const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi

async function addNotifikasi(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('notifikasi').insertOne(JSON.parse(req.body));
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

async function deleteNotifikasi(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { emailReq } = req.query;
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('notifikasi').deleteMany({
            'email': emailReq
        });
        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        // returning an error
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
            return getNotifikasi(req, res);
        }
        case 'POST': {
            return addNotifikasi(req, res);
        }
        case 'PUT': {
            return updateNotifikasi(req, res);
        }
        case 'DELETE': {
            return deleteNotifikasi(req, res);
        }
    }
}