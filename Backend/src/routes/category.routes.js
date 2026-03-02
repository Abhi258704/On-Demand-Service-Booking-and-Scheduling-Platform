import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { createCategory, getAllCategories } from "../controllers/category.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// Public
router.route("/view-categories")
    .get(getAllCategories)

// Admin
router.route("/create").post(
   verifyJwt,
   upload.single("coverImage"),
   createCategory
)

export default router