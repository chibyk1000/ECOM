const UserModel = require("../models/userModels");
const passwordSchema = require("../utils/passwordSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const sendmail = require("../utils/mailer");
const generateCode = require('../utils/generateCode')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, repeat_password } = req.body;
    if (!firstname || !lastname || !email || !password || !repeat_password) {
      return res.status(400).json({ message: "some fields are missing" });
    }

    if (password.trim() !== repeat_password.trim()) {
      return res.status(400).json({ message: "passwords do not match" });
    }

    if (!passwordSchema.validate(password)) {
      return res.status(400).json({ message: "invalid password" });
    }
    if (!validator.default.isEmail(email)) {
      return res.status(400).json({ message: "invalid email address" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user exist" });
    }

    const salt = await bcrypt.genSalt(10);
      const hashedpass = await bcrypt.hash(password, salt);
    const subject = "Confirm Your email"
    
const code  = generateCode()

    const text = `Please verify your account with this Code`;

    const html = `
    <div style="width: 500px; border:1px solid #ccc; padding: 10px; ">
    <h2 style="color:forestgreen">${code}</h2>
    <h3>Thanks!!!</h3>
    </div>
    `
    sendmail(subject, email, text, html)
    const codeToken = jwt.sign({ email}, process.env.CODE_TOKEN)
    res.cookie('code', codeToken, {maxAge:1000*60*5, httpOnly:true, })
    const newuser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedpass,
    });

    newuser.save();

    return res.status(200).json({ message: "please confirm your email address" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body
    if (!code) {
           return res.status(400).json({ message: "missing field" });
    }

    if (!req.cookies.code) {
      return res.status(404).json({ message: "invalid verification code" });
    }
    const email = jwt.verify(req.cookies.code, process.env.CODE_TOKEN).email
    if (!email) {
      return res.status(400).json({ message: "invalid token" })
    }
    const update = await UserModel.updateOne({ email }, { emailVerified: true });
    return res.status(200).json({message:"verification successfull"})


  } catch (error) {
    
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email, !password) {
      return res.status(400).json({message: "missing field"})
    }
     const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ message: "please verify your email address" })
    }

    const isPass = await bcrypt.compare(password, user.password)
    if (!isPass) {
      return res.status(400).json({ message: "incorrect password" })
    }
    const token = jwt.sign(user.email, process.env.USER_TOKEN_PASS)

    res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true,  path: "/" })
    return res.status(200).json({ message:"logged in"})
  } catch (error) {
    
  }
}

const getUser = async(req, res) => {
  try {
    console.log(req.cookies)
    const email = jwt.verify(req.cookies.token, process.env.USER_TOKEN_PASS)
    const user = await UserModel.findOne({ email }).select(['-password','-role', '-emailVerified'])
    
    res.status(200).json(user)

  } catch (err) {
    // console.log(err)
  }
}

module.exports = {signup, login, verifyEmail, getUser}