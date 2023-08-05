const Product = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()





const createProducts = async (req, res) => {
    const { name,price,category, brand,rating,description,images } = req.body

    if (!name || !images) {
        res.status(403).json({
            message: "Missing Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB Connected")
            const checkExisting = await Product.exists({ name })

            if (checkExisting) {
                res.status(208).json({
                    message: "Already Exists"
                })
            }

            else {
                await Product.create({ name,price,category, brand,rating,description,images })
                const allproducts = await Product.find()

                res.json({
                    message: "DB Connected",
                    category: allproducts
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

const productbycategory = async (req, res) => {

   
    const { category } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const product = await Product.findOne({ category } )
        res.json({ product })

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

const productbybrand = async (req, res) => {

   
    const { brand } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const product = await Product.findOne({ brand } )
        res.json({ product })

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

const updateproduct = async (req, res) => {
    const { _id, name } = req.body

    const filter = { _id };
    const update = { name};

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")

        await Product.findOneAndUpdate(filter, update, {
            new: true
        });

        const product = await Product.find()

        res.status(202).json({
            message: "Success",
            product
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const deleteproduct = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        await Product.deleteOne({ _id })
        const product = await Product.find()
        res.status(200).json({
            message: "Deleted",
            product
        })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const getAllproducts = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const product = await Product.find()
        res.json({
            category: product
        })

    }


    catch (error) {
        res.status(417).json({
            message: error
        })
    }

}

const getProductByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const product = await Product.findOne({ _id })
        res.json({ product })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
module.exports = { createProducts,productbycategory,productbybrand,updateproduct,deleteproduct,getAllproducts,getProductByID } 