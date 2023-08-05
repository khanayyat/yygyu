const app = require('express')
const router = app.Router()

const { Addbrand, getallbrands, brandByID , brandbyname , deleteBrand,updateBrand} = require('./controller')

router.post('/addbrand', Addbrand)
router.get('/brandbyid', brandByID)
router.get('/getallbrands', getallbrands)
router.get('/getbrandbyname', brandbyname)
router.delete('/deletebrand', deleteBrand)
router.put('/updatebrand', updateBrand)


module.exports = router
