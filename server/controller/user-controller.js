const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred while checking for existing user" });
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  let user;
  const hashedPassword = bcrypt.hashSync(password, 10); 
  try {
   
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "regular",
    });
    user = await user.save();
  } catch (err) {
    return res.status(500).json({ message: "Unable to store user" });
  }

  if (!user) {
    return res.status(500).json({ message: "Unable to store user" });
  }
  
  return res.status(201).json({ user });
};


const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "An error occurred while finding the user" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const tokenPayload = { id: existingUser._id, role: existingUser.role || "regular" };

  const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  console.log("User's Role:", tokenPayload.role);

  return res.status(200).json({ message: "Authentication Complete", token, id: existingUser._id, name: existingUser.name });
};


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ users });
};

module.exports = { addUser, userLogin, getUsers };
