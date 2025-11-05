 const express = require('express')
 const router = express.Router()
 const { 
    registerUser, 
    loginUser, 
    getMe,
    getUserProfile,
    updateUserProfile
     } = require('../controller/userController')


 const {protect} = require('../middleware/authMiddleware')
 const upload = require('../middleware/uploadMiddleware.js')
 
 router.post('/', registerUser)
 router.post('/login', loginUser)
 router.get('/me',protect, getMe)

 router
  .route('/profile')
  .get(protect, getUserProfile) 
  .put(protect, upload.single('profileImage'), updateUserProfile);

 module.exports = router