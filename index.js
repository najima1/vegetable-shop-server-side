const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const { getAllProducts } = require('./controlar')
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const run = async () => {
    try {
        // 1) get all the products
        app.get('/products', getAllProducts)

    } catch (error) {
        console.log(error.message);
    }
}
run()

app.listen(port, (req, res) => {
    console.log('Server is runnging on ', port);
})