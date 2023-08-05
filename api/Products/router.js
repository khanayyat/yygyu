const app = require('express')
const router = app.Router()
const { createProducts,productbycategory,productbybrand,updateproduct,deleteproduct,getAllproducts,getProductByID} = require('./controller')


router.post('/createproducts', createProducts)
router.get('/product/category',productbycategory )
router.get('/product/brand',productbybrand )
router.put('/updateproduct', updateproduct)
router.delete('/deleteproduct', deleteproduct)
router.get('/getallproduct', getAllproducts)
router.get('/getproductid',  getProductByID)
module.exports = router