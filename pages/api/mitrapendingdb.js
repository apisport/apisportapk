const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getMitraPending(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let mitraPending = await db
            .collection('mitraPending')
            .find({})
            .sort({ idMitra: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(mitraPending)),
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
async function addMitraPending(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('mitraPending').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Mitra Pending Telah di Tambahkan',
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

async function deleteMitraPending(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('mitraPending').deleteOne({
            '_id': convertedObjectId
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
            return getMitraPending(req, res);
        }
        case 'POST': {
            return addMitraPending(req, res);
        }
        case 'PUT': {
            return updateMitraPending(req, res);
        }
        case 'DELETE': {
            return deleteMitraPending(req, res);
        }
    }
}