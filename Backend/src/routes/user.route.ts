import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { validate } from "../validators/validate";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router()




router.route('/register').post(
    upload.single('avatar'),
    validate,
    registerUser
)

router.route('/login').post(
    validate,
    loginUser
)


router.route('/get-users').get(
    authenticateJWT,
    validate,
    getAllUsers
)


router.route('/logout').post(authenticateJWT, logoutUser)



export default router