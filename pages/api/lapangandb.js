const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection lapangan
async function getLapangan(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // fetch the posts
        let lapangan = await db
            .collection('lapangan')
            .find({})
            .sort({ idLapangan: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(lapangan)),
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
// menambah data kedalam collection lapangan
async function addLapangan(req, res) {
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // add the post
        await db.collection('lapangan').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Data lapangan Telah di Tambahkan',
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

async function updateLapangan(req, res) {
    const { namaVenue,
        namaLapangan,
        namaLapanganOld,
        deskripsi,
        gambar,
        jadwalPagi,
        jadwalMalam,
        hargaPagi,
        hargaMalam } = req.body
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // update the published status of the post
        await db.collection('lapangan').updateOne(
            {
                'namaVenue': namaVenue,
                'namaLapangan': namaLapanganOld
            },
            {
                $set: {
                    'namaLapangan': namaLapangan,
                    'deskripsi': deskripsi,
                    'gambar': gambar,
                    'jadwalPagi': jadwalPagi,
                    'jadwalMalam': jadwalMalam,
                    'hargaPagi': hargaPagi,
                    'hargaMalam': hargaMalam
                }
            }
        );
        // return a message
        return res.json({
            message: 'Post updated successfully',
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

async function deleteLapangan(req, res) {
    var ObjectId = require('mongodb').ObjectId;
    const { _id } = req.body;
    const convertedObjectId = new ObjectId(_id);
    try {
        // Connecting to the database
        let { db } = await connectToDatabase();
        // Deleting the post
        await db.collection('lapangan').deleteOne({
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
            return getLapangan(req, res);
        }
        case 'POST': {
            return addLapangan(req, res);
        }
        case 'PUT': {
            return updateLapangan(req, res);
        }
        case 'DELETE': {
            return deleteLapangan(req, res);
        }
    }
}