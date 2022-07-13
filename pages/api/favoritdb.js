const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getFavorit(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let favorit = await db
            .collection('favorit')
            .find({})
            .sort({ idfavorit: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(favorit)),
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
async function addFavorit(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('favorit').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Favorit Telah di Tambahkan',
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

async function deleteFavorit(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('favorit').deleteOne({
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
            return getFavorit(req, res);
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