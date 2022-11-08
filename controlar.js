
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.DB_USER
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const db = client.db('USER_DB')
const userCollection = db.collection('products')

//get all the product from database
const getAllProducts = async (req, res) => {
    try {
        const query = {}
        const products = await userCollection.find(query).toArray()
        console.log(products);

        if (!products) {
            return res.send({
                status: false,
                message: 'Product dosen"t exist'
            })
        }

        res.send({
            status: true,
            message: "Product fonud from the database",
            data: products
        })

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}



module.exports = {
    getAllProducts
}