import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    const { username, password } = req.body;
    if(!(username && password)){
        return res.status(400).json({ message: "Username and password are required" });
    }
    const existuser = await User.findOne({username})

    if(existuser){
        return res.status(400).json({message: "username already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
        username: username.toLowerCase(),
        password : hashedPassword
    })


    res.status(200).json({user, message: "user created successfully"})
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    if(!(username && password)){
        return res.status(400).json({ message: "Username and password are required" });
    }
    const checkUser = await User.findOne({username})
    if(!checkUser){
        return res.status(400).json({message: "User does not exist."})
    }

    const accessToken = jwt.sign(
        { id: checkUser._id,
            username: checkUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

    res
    .header("Authorization", accessToken)
    // .cookie("accessToken", accessToken)
    .status(200).json({user: checkUser,accessToken, message: "User Login Successfull"})
}
const getCurrentUser = async(req, res) => {
    const { userId } = req.params;
  const user = await User.findOne(userId);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ user, message: "Current user fetched successfully" });
    
}

const logoutUser = async(req, res) =>{
    const tokenBlacklist = [];
    const token = req.header('Authorization');
    tokenBlacklist.push(token);
    res.status(200).json({ message: 'User logged out successfully' }); 
}

const allUser = async(req, res) => {
    const users = await User.find()
    res.status(200).json({users, message: "all user fetched successfully"})
}

export {registerUser, loginUser, logoutUser, getCurrentUser, allUser}