const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
//@route POST/api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all fields')
    }

    //check if user Exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create the user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }

    res.json({message: 'register user'})
})

// @desc Authenticate a user
//@route POST/api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by the 'protect' middleware
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Handle password update
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Handle image upload
    if (req.file) {
      // 'req.file.path' is the path set by multer
      // We must replace backslashes \ with forward slashes / for URL
      // Make sure the path starts with a '/'
      const imagePath = req.file.path.replace(/\\/g, '/');
      user.profileImage = `/${imagePath}`;
    }

    const updatedUser = await user.save();

    // Respond with the updated user data, including a new token
    // (in case the token payload includes details like 'name' in a real app,
    // and to refresh the expiry)
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id, updatedUser.role), // Assuming generateToken takes (id, role)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc Get user data
//@route GET/api/users/me
// @access private
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

//Generate JWT
const generateToken = (id, role) =>{
    return jwt.sign({ id , role}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getUserProfile,
    updateUserProfile,
}