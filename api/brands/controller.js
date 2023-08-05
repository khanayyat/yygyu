const { Brand } = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()

const Addbrand = async (req, res) => {

    const { Brandname, Brandimage } = req.body

    if (!Brandname || !Brandimage) {
        res.json({
            message: "Please Insert Proper Values"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB Connected")

            await Brand.create({ Brandname, Brandimage })
            const brands = await Brand.find()
            res.status(201).json({
                message: "Brand Created Successfully",
                brands: brands
            })
        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}

const brandByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const brands = await Brand.findOne({ _id })
        res.json({ brands })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const getallbrands = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")

        const brands = await Brand.find()
        res.status(200).json({
            brands
        })
    }

    catch (error) {
        res.json({
            message: error.message
        })
    }

}

const brandbyname = async (req, res) => {

   
    const { BrandName } = req.query
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const brands = await Brand.findOne({ BrandName })
        res.json({ brands })

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

const deleteBrand = async (req, res) => {
    const { Brandname } = req.body
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        await Brand.deleteOne({ Brandname })
        const brands = await Brand.find()
        res.json({
             message: "Success",
             brands
    
    })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const updateBrand = async (req, res) => {

    const { _id, Brandname, Brandimage } = req.body

    const filter = { _id };
    const update = { Brandname, Brandimage };

    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
    
        const updated = await Brand.findOneAndUpdate(filter, update, {
            new: true
        })
       

        res.json({
            message: "Success",
            brands: updated
        })

    }

    catch (error) {
        res.json({
            message: error.message,
        })
    }
}


module.exports = { Addbrand, brandByID, getallbrands, brandbyname, deleteBrand,updateBrand }