const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

let refreshTokens = [];
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "please fill all required fields!",
        success: false,
      });
    }
    console.log(`${username}  ${email}  ${password}`);
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).send({
        message: "user already exists!",
        success: false,
      });
    }
    //save user if everything good
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .send({ message: "user created!", success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in registering ", success: false, error });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.ACCESS_SECRET,
    { expiresIn: "20s" }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({
        message: "please fill all required fields!",
        success: false,
      });

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "email not registered!",
        success: false,
      });
    }
    console.log(password, user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "inavalid email or password!",
        success: false,
      });
    }

    //everything good
    const access_token = generateToken(user);
    const refresh_token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.REFRESH_SECRET
    );
    refreshTokens.push(refresh_token);
    return res.status(200).send({
      message: "login succesful",
      success: true,
      access_token,
      refresh_token,
      //todo: add token
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error logging in ", success: false, error });
  }
};
exports.refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token)
      return res.status(400).send({
        message: "no token found!",
        success: false,
      });
    if (!refreshTokens.includes(refresh_token)) {
      return res.status(403).send({
        message: "invalid token!",
        success: false,
      });
    }

    jwt.verify(refresh_token, process.env.REFRESH_SECRET, (error, user) => {
      if (error)
        return res.status(403).send({
          message: "invalid refresh_token!",
          success: false,
        });
      const access_token = generateToken({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
      return res.status(201).send({
        access_token,
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error refreshing token", success: false, error });
  }
};

exports.logout = async (req, res) => {
  const { refresh_token } = req.body;
  refreshTokens = refreshTokens.filter((token) => token !== refresh_token);
  return res.status(204).send({
    message: "Logout succesful",
    success: true,
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      usersCount: users.length,
      message: "all users data",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error get all users ", success: false, error });
  }
};
