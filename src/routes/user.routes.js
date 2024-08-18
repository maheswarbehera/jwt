import { Router } from "express"; 
import { registerUser, loginUser, logoutUser, getCurrentUser, allUser} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").get(loginUser)
router.route("/:id").get(verifyJwt, getCurrentUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/verify").get(verifyJwt)
router.route("/").get(verifyJwt,allUser)


export default router