const Category = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()

const getAllCategories = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const allCategories = await Category.find()
        res.json({
            category: allCategories
        })

    }


    catch (error) {
        res.status(417).json({
            message: error
        })
    }

}


const getCategoryByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const category = await Category.findOne({ _id })
        res.json({ category })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const createCategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Missing Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB Connected")
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(208).json({
                    message: "Already Exists"
                })
            }

            else {
                await Category.create({ CategoryName, CategoryImage })
                const allCategories = await Category.find()

                res.json({
                    message: "DB Connected",
                    category: allCategories
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

const categorybyname = async (req, res) => {

   
    const { CategoryName } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const category = await Category.findOne({ CategoryName })
        res.json({ category })

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

const updateCategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id };
    const update = { CategoryName, CategoryImage };

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")

        await Category.findOneAndUpdate(filter, update, {
            new: true
        });

        const category = await Category.find()

        res.status(202).json({
            message: "Success",
            category
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const deleteCategory = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        await Category.deleteOne({ _id })
        const category = await Category.find()
        res.status(200).json({
            message: "Deleted",
            category
        })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

module.exports = { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory,categorybyname} 