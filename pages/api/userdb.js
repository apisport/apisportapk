const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection user
async function getUser(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let user = await db
            .collection('user')
            .find({})
            .sort({ iduser: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(user)),
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
async function deleteuser(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('user').deleteOne({
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

// menambah data kedalam collection user
async function adduser(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('user').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Data user Telah di Tambahkan',
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
            return getUser(req, res);
        }
        case 'POST': {
            return adduser(req, res);
        }
        case 'PUT': {
            return updateuser(req, res);
        }
        case 'DELETE': {
            return deleteuser(req, res);
        }
    }
}