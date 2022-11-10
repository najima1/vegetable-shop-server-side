const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const { getAllProducts, getSingleProduct, makeUserReview, getAllTheReviews, deleteReview, createProduct } = require('./controlar')
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const run = async () => {
    try {
        // 1) get all the products
        app.get('/products', getAllProducts)

        //get single products
        app.get('/product/:id', getSingleProduct)

        //get all review from server
        app.get('/review', getAllTheReviews)

        // delete single review
        app.delete('/product/deleted/:id', deleteReview)

        // create user review
        app.post('/product/review', makeUserReview)

        //create single product
        app.post('/product/create', createProduct)


    } catch (error) {
        console.log(error.message);
    }
}
run()

app.listen(port, (req, res) => {
    console.log('Server is runnging on ', port);
})