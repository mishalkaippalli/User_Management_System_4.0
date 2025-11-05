const express = require('express')
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/adminController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.use((req, res, next) => {
  console.log(`[ADMIN ROUTE HIT] ${req.method} ${req.originalUrl}`);
  next();
});
 

// All routes in this file are protected and admin-only
router.use(protect, admin);

router.route('/users').get(getUsers).post(createUser);

router
  .route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;