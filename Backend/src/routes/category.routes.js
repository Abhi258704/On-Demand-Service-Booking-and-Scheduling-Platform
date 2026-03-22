import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { createCategory, getAllCategories } from "../controllers/category.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { updateCategory } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";

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

router.route("/updateCategory/:categoryId").patch(
    verifyJwt,
    upload.single("coverImage"),
    updateCategory
)

router.route("/deleteCategory/:categoryId").delete(
    verifyJwt,
    deleteCategory
)


export default router