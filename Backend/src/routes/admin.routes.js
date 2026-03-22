import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { getAdminStats } from "../controllers/admin.controller.js"

const router = express.Router()

router.route("/stats").get(verifyJwt, getAdminStats)

export default router