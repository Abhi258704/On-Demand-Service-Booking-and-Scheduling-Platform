import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser, getCurrentUser, changeCurrentPassword, updateAccountDetails, updatePfp } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const  router = Router()


router.route("/register").post(
    
    upload.fields([
        {
            name: "pfp",
            maxCount: 1
        }
    ]),

    registerUser
)

router.route("/login").post(loginUser)


// secured routes

router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").get(verifyJwt, getCurrentUser);

router.route("/change-password").patch(
    verifyJwt,
    changeCurrentPassword
);

router.route("/update-details").patch(
    verifyJwt,
    updateAccountDetails
);

router.route("/update-pfp").patch(
    verifyJwt,
    upload.single("pfp"),
    updatePfp
);


export default router