
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const uri = process.env.DB_USER
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const db = client.db('USER_DB')
const userCollection = db.collection('products')
const user_review = db.collection('reviews')

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

// get all the single product with id
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: ObjectId(id) }
        const single_product = await userCollection.findOne(query)

        if (!single_product) {
            return res.send({
                status: false,
                message: "Product not found"
            })
        }


        res.send({
            status: true,
            message: 'Product founded',
            data: single_product
        })

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}


// make user review 
const makeUserReview = async (req, res) => {
    try {
        const { name, email, msg, image, productID } = req.body


        if (!name && !email && !msg && !image && !productID) {
            return res.send({
                status: false,
                message: "review value not found"
            })
        }

        const validReview = { name, email, msg, image, productID }
        const result = await user_review.insertOne(validReview)


        if (validReview) {
            res.send({
                status: true,
                message: 'review sent',
                data: result
            })
        }


    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

// get all the reviews
const getAllTheReviews = async (req, res) => {
    try {
        const query = {}
        const cursor = await user_review.find(query).toArray()


        if (cursor) {
            return res.send({
                status: true,
                message: "Review Product found",
                data: cursor
            })
        }

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}


// delete review
const deleteReview = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const query = { _id: ObjectId(id) }
        const cursor = await user_review.deleteOne(query)


        res.send({
            status: true,
            message: "Review Product deleted success",
            data: cursor
        })

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

//create single product
const createProduct = async (req, res) => {
    try {
        const query = req.body

        if (!query) {
            return res.send({
                status: false,
                message: "Not a valid product"
            })
        }
        const result = await userCollection.insertOne(query)
        if (result) {
            return res.send({
                status: true,
                message: "Product created successfull",
                data: result
            })
        }

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

//review update
const update_review = async (req, res) => {
    try {
        const id = req.params.id
        const updateReview = req.body
        const filter = { _id: ObjectId(id) }
        const options = { upsert: true };
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                name: updateReview.r_name,
                image: updateReview.r_image,
                msg: updateReview.r_message
            },
        };

        const result = await user_review.updateOne(filter, updateDoc, options)
        res.send(result)

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

//get signle review
const getSingleReview = async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: ObjectId(id) }

        const result = await user_review.findOne(query)
        res.send(result)

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    makeUserReview,
    getAllTheReviews,
    deleteReview,
    createProduct,
    update_review,
    getSingleReview
}