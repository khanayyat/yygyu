const app = require('express')
const router = app.Router()

const { SignUp,  Login, allUsers, getUserbyEmail, getUserbyid ,deleteUser,updateProfile} = require('./controller')



router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/getallusers', allUsers)
router.get('/getuserbyemail/:email', getUserbyEmail)
router.get('/getuserbyid', getUserbyid)
router.delete('/deleteuser',deleteUser )
router.put('/updateuser',updateProfile )




module.exports = router