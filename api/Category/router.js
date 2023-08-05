const app = require('express')
const router = app.Router()
const { getAllCategories, getCategoryByID, createCategory, updateCategory, deleteCategory,categorybyname } = require('./controller')

router.get('/getallcategories', getAllCategories)
router.get('/getcategorybyid', getCategoryByID)
router.post('/createcategory', createCategory)
router.put('/updatecategory', updateCategory)
router.delete('/deletecategory', deleteCategory)
router.get('/getcategorybyname',categorybyname)


module.exports = router