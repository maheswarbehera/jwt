import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const registerUser = async(req, res) => {
    const { username, password } = req.body;
    if(!(username && password)){
        return res.status(400).json({ status: false, message: "Username and password are required" });
    }
    const existuser = await User.findOne({username})

    if(existuser){
        return res.status(201).json({status: false, message: "username already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
        username: username.toLowerCase(),
        password : hashedPassword
    })


    res.status(200).json({user, status: true, message: "user created successfully"})
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    if(!(username && password)){
        return res.status(400).json({ status: false, message: "Username and password are required" });
    }
    const checkUser = await User.findOne({username}).select("-password");
    if(!checkUser){
        return res.status(400).json({status: false, message: "User does not exist."})
    }

    const accessToken = jwt.sign(
        { id: checkUser._id,
            username: checkUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        // { expiresIn: '1h' }
      );

    res
    .header("Authorization", accessToken)
    // .cookie("accessToken", accessToken)
    .status(200).json({user: checkUser,accessToken, status: true, message: "User Login Successfull"})
}
const GetById = async(req, res) => {
    const { userId } = req.params;
  const user = await User.findOne(userId);
  if (!user) {
    return res.status(401).json({ status: false,message: "Unauthorized" });
  }
  res.status(200).json({ user,status: true, message: "user fetched successfully" });
    
}
const getCurrentUser = async(req, res) => {
    return res.status(200).json({user: req.user, status: true, message: "Current user fetched successfully"})
}

const logoutUser = async (req, res) => {
    res.setHeader("Authorization", " ").status(200).json({ status: true,message: 'User logged out successfully' });
}

const allUser = async(req, res) => {
    const users = await User.find()
    res.status(200).json({users,status: true, message: "all user fetched successfully"})
}

const userController = { registerUser, loginUser, logoutUser, getCurrentUser, GetById, allUser };
export default userController;