import { Router } from "express"; 
import userController from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route("/register").post(registerUser)
// router.route("/login").post(loginUser)
// router.route("/:id").get(verifyJwt, GetById)
// router.route("/logout").post(verifyJwt, logoutUser)
// router.route("/verify").get(verifyJwt)
// router.route("/").get(verifyJwt,allUser)
// router.route("/current-user").get(verifyJwt,getCurrentUser)

router
    .post('/register', userController.registerUser)
    .post('/login', userController.loginUser)
    .get('/:id', verifyJwt, userController.GetById)
    .post('/logout', verifyJwt, userController.logoutUser)
    .get('/verify', verifyJwt)
    .get('/', verifyJwt, userController.allUser)
    .get('/current-user', verifyJwt, userController.getCurrentUser)
    

export default router