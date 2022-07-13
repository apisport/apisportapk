const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;
// mengambil data dari collection Transaksi
async function getLapangan(req, res) {
    const { namaVenueReq } = req.query
    try {
        // connect to the database
        let { db } = await connectToDatabase();
        // let venue = await db
        //     .collection('mitra')
        //     .find({
        //         "namaVenue" : {$regex: `.*${namaVenueReq}.`, $options:"i"}
        //     },{ projection: { 'namaVenue': 1 } })
        //     .toArray();
        let searchMitra = await db
            .collection('mitra')
            .aggregate([
                {
                    $match: {
                        "namaVenue" : {$regex: `.*${namaVenueReq}.`, $options:"i"}
                    }
                },
                {
                    $lookup: {
                        from: "lapangan",
                        localField: "namaVenue",
                        foreignField: "namaVenue",
                        as: "lapanganVenue"
                    }
                }, {
                    $project: {
                        namaVenue : 1,
                        alamat : 1,
                        noWa : 1,
                        instagram : 1,
                        kategori : 1,
                        hariOperasional : 1,
                        jamOperasional: 1,
                        fotoVenue: 1,
                        lapanganVenue: {
                            hargaPagi: 1
                        }
                    }
                }
            ])
            .toArray()
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(searchMitra)),
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
            return getLapangan(req, res);
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