import { Router } from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { createService, getAllServices } from "../controllers/service.controller.js"
import { updateService } from "../controllers/service.controller.js"
import { deleteService } from "../controllers/service.controller.js"
import { getServicesByCategory } from "../controllers/category.controller.js"

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


router.route("/update/:serviceId").patch(
    verifyJwt,
    upload.single("serviceImage"),
    updateService
)

router.route("/delete/:serviceId").delete(
    verifyJwt,
    deleteService
)

router.route("/category/:categoryId")
    .get(getServicesByCategory)


export default router