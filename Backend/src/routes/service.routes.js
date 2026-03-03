import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { createService, getAllServices } from "../controllers/service.controller.js"

const router = Router()

// Public route
router.route("/viewServices")
    .get(getAllServices)


// Admin only
router.route("/create")
    .post(
        verifyJwt,
        upload.single("serviceImage"),
        createService
    )

export default router