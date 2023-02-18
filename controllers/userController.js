const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler (async (request, response) => {
  const { username, email, password } = request.body;
  if(!username || !email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory");
  };

  const userAvailable = await User.findOne({ email });

  if(userAvailable) {
    response.status(400);
    throw new Error("User already registered");
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if(user) {
    response
      .status(201)
      .json({user: {
        username: user.username,
        email: user.email
      }});
  } else {
    response.status(400);
    throw new Error("User data is not valid");
  }
});

const loginUser = asyncHandler (async (request, response) => {
  const { email, password } = request.body;

  if(!email || !password) {
    response.status(400);
    throw new Error("All fields are mandatory");
  };

  const user = await User.findOne({ email });

  if(user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "120m"
      }
    )
    response
      .status(200)
      .json({ accessToken });
  } else {
    response.status(401);
    throw new Error("email or password is not valid");
  }
});

const currentUser = asyncHandler (async (request, response) => {
  response
    .status(200)
    .json(request.user)
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
