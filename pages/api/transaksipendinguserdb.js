const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getTransaksi(req, res) {
    const { emailReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let transaksi = await db
            .collection('transaksi')
            .find({
                email: emailReq,
                status: 'pending',
                buktiBayar: {$ne: null}
            }, { projection: { 'buktiBayar': 0 } })
            .sort({ idTransaksi: -1 })
            .toArray();
        let notifikasi = await db
            .collection('notifikasi')
            .find({
                email: emailReq,
                status: 'ditolak'
            })
            .sort({ idTransaksi: -1 })
            .toArray();
        let belumBayar = await db
            .collection('transaksi')
            .find({
                email: emailReq,
                status: 'pending',
                buktiBayar: null
            }, { projection: { 'buktiBayar': 0 } })
            .sort({ idTransaksi: -1 })
            .toArray();
        let hasil = {}
        hasil['pending'] = transaksi
        hasil['notifikasi'] = notifikasi
        hasil['belumBayar'] = belumBayar
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

async function deleteTransaksi(req, res) {
    const { emailReq } = req.body;
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