const asyncHandler = require("express-async-handler");
const generateToken = require("../generateToken");
const User = require("../models/userModel");
const { use } = require("../routes/userRoutes");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.send(400);
    throw new Error("Please enter all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.send(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Faild to create the user");
  }
});

const loginUser =asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({email})
  if(user && user.matchPassword(password)){
     res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
     })
  }else{
    res.status(401)
    throw new Error('invalid emial or phone')
  }
});

module.exports = { registerUser, loginUser };
