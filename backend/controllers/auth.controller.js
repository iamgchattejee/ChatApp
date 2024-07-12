import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
   
    const { fullName, username, password, confirmPassword, gender } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser =  await User.create({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      const userid = newUser._id
      const token = jwt.sign({userid}, process.env.JWT_SECRET, {
        expiresIn: "15d"
      });
      generateTokenAndSetCookie(res, token);  
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        token: token  // add token to response for client side use
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      err: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(400).json({ message: "Please provide both username and password" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid Password" });
    }
    const userid = user._id;
    const token = jwt.sign({userid}, process.env.JWT_SECRET, {
      expiresIn: "15d"
    });
    generateTokenAndSetCookie(res, token);  
    return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        token: token
    });
 
  } catch (err) {
    return res.status(400).json({
      err: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (err) {
    return res.status(400).json({
      err: "Internal Server Error",
    });
  }
};
