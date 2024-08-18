import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; 
export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token)
    if (!token) res.status(401).json({ message: "access token required"});

  
      // const user = await User.findOne({ username: req.body.username });
      // if (!user) return res.status(404).json({ message: "User not found" });
  
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid Access Token!" });
      }
  
      // const user = await User.findById(decodedToken?._id) 
    
      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }
        req.user = decodedToken; // user from line 15
        next()
       
    
    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        // Token has expired, return a 401 status code
        return res.status(401).json({ status:false, message: `Access token has expired at ${error.expiredAt}` });
      } else {
        // Other errors, return a 500 status code
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };