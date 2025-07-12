const User = require("../model/userSchema");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const get404 = (req, res) => {
  return res
    .status(404)
    .render("../views/error.ejs", { msg: "page not found" });
};
const getHome = (req, res) => {
  return res.status(200).render("../views/home.ejs");
};

const getSign = (req, res) => {
  return res.status(200).render("../views/sign.ejs");
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password, "from control.js 22");

    if (!validator.isEmail(email)) throw new Error("Incorrect Email format");

    if (!password) throw new Error("Password cannot be empty");

    if (password.length < 8)
      throw new Error("Password length should be at least 8");

    if (!validator.isAlphanumeric(password))
      throw new Error("Password should only contain alphabets and numbers");

    const userData = await User.findOne({ email });

    console.log(userData, "from control.js 36");

    if (userData !== null) throw new Error("user already exist");

    const hashedPassword = await bcryptjs.hash(
      password,
      parseInt(process.env.BCRYPTJS_SALT)
    );

    const userCreated = await User.insertOne({
      email,
      password: hashedPassword,
    });

    console.log(userCreated, "from control.js 50");

    return res
      .status(201)
      .json({ msg: "User created successfully", userCreated });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password, "from control.js 64");

    if (!validator.isEmail(email)) throw new Error("Incorrect Email format");

    if (!password) throw new Error("Password cannot be empty");

    if (password.length < 8)
      throw new Error("Password length should be at least 8");

    if (!validator.isAlphanumeric(password))
      throw new Error("Password should only contain alphabets and numbers");

    const userData = await User.findOne({ email });

    console.log(userData, "from control.js 78");

    if (userData === null) throw new Error("user does not exist");

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userData.password
    );

    if (isPasswordCorrect === false) throw new Error("Incorrect password");

    const token = jwt.sign(
      {
        _id: userData._id,
        email: userData.email,
        password: userData.password,
        createdAt: userData.createdAt,
        isVerified: true,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "3d",
      }
    );

    console.log(token);

    return res.status(200).json({ msg: "user verified", token });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = { get404, getHome, getSign, signIn, signUp };
