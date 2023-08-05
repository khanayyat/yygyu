const { Schema, model } = require('mongoose')

const BrandSchema = new Schema({
    Brandname: {
        type: String,
        required: true,
        unique: true
    
    },
    Brandimage: {
        type: String,
        required: true
    }
    // id :{
    //     type : "string"
    // }

})

const Brand = model('brand', BrandSchema)
module.exports = { Brand }